<?php

namespace App\Http\Controllers;

use App\Jobs\IspPacketlossAnalysis;
use App\Jobs\IspPingAnalysis;
use App\Jobs\IspSpeedAnalysis;
use App\Models\RstCityStats;
use App\Models\RstDisturbance;
use App\Models\RstIspStats;
use App\Models\RstResult;
use Illuminate\Http\Request;
use App\Models\RstServer;
use App\Services\ChartService;
use App\Services\NetworkService;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class NetworkController extends Controller
{
    function getClientIp(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'ip' => 'sometimes|ip', // Validate that 'ip' is a valid IP address
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'data' => [],
                    'message' => 'Invalid IP address'
                ]);
            }

            return response()->json([
                'status' => true,
                'data' => ['ip' => $request->ip()],
                'message' => '',
            ]);

        } catch(\Exception $e) {
            return response()->json([
                'status' => false,
                'data' => [],
                'message' => $e->getMessage()
            ]);
        }
    }

    public function setIpInfo(Request $request)
    {
        try {
            RstResult::InsertHelloRequest((object)$request->all());

            return response()->json([
                'status' => true,
                'message' => 'thank you. information was recorded!'
            ]);
        } catch(\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function servers()
    {
        $servers = RstServer::all();
        $ping = [];
        $best_server_index = 0;
        $servers = $servers->map(function($server) use (&$ping){
            $ping[$server->id] = NetworkService::Ping(Str::replace(['https://', 'http://'], '', $server->url), 1);
            $server->best_server = false;
            return $server;
        });
        $minPingKey = current(array_keys($ping, min($ping)));
        foreach($servers as $index => $server) {
            if($server->id === $minPingKey) {
                $server->best_server = true;
                $best_server_index = $index;
                break;
            }
        }
        return response()->json(['servers' => $servers->toArray(), 'best_server_index' => $best_server_index]);
    }

    public function downloadSpeed(Request $request)
    {
        $testUrl = "https://static.kar1.net/general/kar-future-3.mp4?uuid=".$request->uid;
        $chunkSize = 20000;
        $handle = fopen($testUrl, 'rb');
        $counter = 1;
        $s = microtime();
        while (!feof($handle)) {
            stream_get_contents($handle, $chunkSize, ($counter * $chunkSize));
            $duration = NetworkService::TakeTime($s);
            if ($duration > 0) {
                $bytesPerSec = ($counter * $chunkSize) / $duration;
                $kbPerSec = $bytesPerSec / 1024;
                $mbPerSec[] = $kbPerSec / 1024;
                echo json_encode(round(array_sum($mbPerSec) / count($mbPerSec) * 8, 2)) . ' ';
            }
            ob_flush();
            flush();
            $counter++;
        }

        RstResult::updateOrCreate([
            'cid' => $request->cid,
            'uuid' => $request->uid,
            'date' => today()->toDateString(),
        ],[
            'download' => round(array_sum($mbPerSec) / count($mbPerSec) * 8, 2),
            'download_duration' => $duration
        ]);
    }

    public function uploadSpeed(Request $request)
    {
        $upload_server = "kar1.net";
        $data = "POST / HTTP/1.0\r\n"
            . "Host: " . $upload_server . "\r\n"
            . "\r\n"
            . str_repeat("a", 1000000); // send 1000kb of data

        $chunkSize = 20000;
        $counter = 1;
        $start = microtime();
        $f = @fsockopen($upload_server, 80);
        while (($counter * $chunkSize) < strlen($data)) {
            fwrite($f, substr($data, ($counter * $chunkSize), 20000));
            $duration = NetworkService::TakeTime($start);
            if ($duration > 0) {
                $bytesPerSec = ($counter * $chunkSize) / $duration;
                $kbPerSec = $bytesPerSec / 1024;
                $mbPerSec[] = $kbPerSec / 1024;
                echo json_encode(round(array_sum($mbPerSec) / count($mbPerSec) * 8, 2)) . ' ';
            }
            ob_flush();
            flush();
            $counter++;
        }

        fclose($f);

        RstResult::updateOrCreate([
            'cid' => $request->cid,
            'uuid' => $request->uid,
            'date' => today()->toDateString(),
        ],[
            'upload' => round(array_sum($mbPerSec) / count($mbPerSec) * 8, 2),
            'upload_duration' => $duration
        ]);
    }

    public function ping(Request $request)
    {
        $pingServer = "static.kar1.net";
        $counter = 0;
        while($counter < 10) {
            list($pingTimes[], $packetLoss[]) = NetworkService::Ping($pingServer);
            $counter++;
        }
        $ping = round(array_sum($pingTimes) / count($pingTimes));
        $packetLoss = array_sum($packetLoss);
        $jitter = NetworkService::Jitter($pingTimes);

        RstResult::updateOrCreate([
            'cid' => $request->cid,
            'uuid' => $request->uid,
            'date' => today()->toDateString(),
        ],[
            'ping' => $ping,
            'packet_loss' => $packetLoss,
            'jitter' => round($jitter, 0),
        ]);

        return round($ping, 0);
    }

    public function ispMetrics(Request $request)
    {
        try {
            $isp = collect(config('app.isps'));
            $ispMetrics = RstIspStats::where('date', '>=', Carbon::today()->subDays(7))->get();
            $data['totalQualityAverage'] = round($ispMetrics->avg('total_quality_average'), 0);
            $data['clients'] = $ispMetrics->sum('clients');
            $data['speedAverage'] = round($ispMetrics->avg('speed_average'), 0);
            $data['downloadAverage'] = round($ispMetrics->avg('download_speed_average'), 0);
            $data['uploadAverage'] = round($ispMetrics->avg('upload_speed_average'), 0);
            $data['pingAverage'] = round($ispMetrics->avg('ping_average'), 0);

            $data['isp'] = collect($isp)
                ->flatMap(function ($item) use ($ispMetrics) {
                    $metrics = $ispMetrics->where('isp', $item);

                    if ($metrics->isEmpty()) {
                        return [];
                    }
                    return [
                        $item => [
                            'downloadSpeedAverage' => round($metrics->avg('download_speed_average')),
                            'uploadSpeedAverage' => round($metrics->avg('upload_speed_average')),
                            'pingAverage' => round($metrics->avg('ping_average')),
                            'packetLoss' => round($metrics->avg('packet_loss')),
                            'totalQuality' => round($metrics->avg('total_quality_average')),
                        ],
                    ];
                });
            return response()->json([
                'status' => true,
                'data' => $data,
                'message' => ''
            ]);
        } catch(\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function cityMetrics(Request $request)
    {
        try {
            $ispMetrics = RstCityStats::where('city', $request->city)
                ->where('date', '>=', Carbon::today()->subDays(7))->get();

            $stats = RstDisturbance::latest()->first();
            $description = json_decode($stats->description);
            $issues = [];
            foreach ($description as $ispInfos) {
                foreach ($ispInfos as $metric => $metricInfos) {
                    if(Str::lower(key($metricInfos)) == Str::lower($request->city)) {
                        $issues[] = $metric;
                    }
                }
            }

            $data = [
                'totalQualityAverage' => round($ispMetrics->avg('total_quality_average'), 0),
                'clients' => $ispMetrics->sum('clients'),
                'speedAverage' => round($ispMetrics->avg('speed_average'), 0),
                'downloadAverage' => round($ispMetrics->avg('download_speed_average'), 0),
                'uploadAverage' => round($ispMetrics->avg('upload_speed_average'), 0),
                'pingAverage' => round($ispMetrics->avg('ping_average'), 0),
                'issuesCount' => count(array_unique($issues)),
                'issues' => array_unique($issues)
            ];

            return response()->json([
                'status' => true,
                'data' => $data,
                'message' => ''
            ]);
        } catch(\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function charts(Request $request)
    {
        try {
            $type = $request->type;
            $rstResult = RstResult::$type($request->isp, 1);
            if($request->city) {
                $rstResult = $rstResult->where('city', $request->city);
            }
            return response()->json([
                'status' => true,
                'data' => ChartService::$type($rstResult),
                'message' => '',
            ]);
        } catch(\Exception $e) {
            return response()->json([
                'status' => false,
                'data' => [],
                'message' => $e->getMessage()
            ]);
        }
    }

    public function stats(Request $request)
    {
        try {
            switch ($request->type) {
                case 'recent':
                    $data = RstResult::recent();
                    break;
                case 'today':
                    $data = RstResult::today();
                    break;
                case 'yesterday':
                    $data = RstResult::daily(null, 1);
                    break;
                case 'week':
                    $data = RstResult::weekly(null, 1);
                    break;
                case 'month':
                    $data = RstResult::monthly(null, 1);
                    break;
                case 'year':
                    $data = RstResult::year(null, 1);
                    break;
                default:
                    $data = RstResult::hourly(null, 3);
                    break;
            }
            $threshold = NetworkService::GetThresholds();
            $downloadAvg = $data->avg('download');
            $uploadAvg = $data->avg('upload');
            $pingAvg = $data->avg('ping');
            $packetLossAvg = $data->avg('packet_loss');
            $response = [
                'download' => [
                    'avg' => round($downloadAvg, 2),
                    'percentage' => round(100 / (1 + exp(-0.2334 * ($downloadAvg - 12.81)))),
                ],
                'upload' => [
                    'avg' => round($uploadAvg, 2),
                    'percentage' => round(100 / (1 + exp(-0.2334 * ($downloadAvg - 12.81))))
                ],
                'ping' => [
                    'avg' => round($pingAvg, 2),
                    'percentage' => round(107.33 * exp(-0.0155 * $pingAvg))
                ],
                'packet_loss' => [
                    'avg' => round($packetLossAvg, 2),
                    'percentage' => round(107.33 * exp(-0.0155 * $packetLossAvg))
                ],
            ];

            return response()->json([
                'status' => true,
                'data' => $response,
                'message' => '',
            ]);
        } catch(\Exception $e) {
            return response()->json([
                'status' => false,
                'data' => [],
                'message' => $e->getMessage()
            ]);
        }
    }

    public function myIspMetrics(Request $request)
    {
        try {
            return response()->json([
                'status' => true,
                'data' => NetworkService::IspMetrics($request->isp),
                'message' => ''
            ]);
        } catch(\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function reports($isp)
    {
        $metrics = ['download', 'ping', 'packet_loss'];
        $isps = collect(config('app.isps'));

        // Fetching reports for all ISPs
        $reports = $isps->mapWithKeys(fn($item) => [
            $item => NetworkService::GetReports($item, $metrics)
        ]);

        // Comparing metrics for the specified ISP
        $metrics[] = 'consistency';
        $comparison = collect($metrics)
            ->mapWithKeys(fn($metric) => [
                $metric => NetworkService::CompareIspReports($reports, $isp, $metric)
            ])
            ->toArray();

        return [
            'reports' => $reports->toArray(),
            'comparison' => $comparison,
        ];
    }

    public function reports2($isp)
    {
        //try {
            $timeFrames = config('app.packet_loss');
            list($analyzeType, $timeFrame, $stat, $report) = NetworkService::IspAnalyze($isp, 'packet_loss', $timeFrames);

            return response()->json([
                'status' => true,
                'stats' => $stat,
                'data' => $report,
                'message' => __('messages.'.$analyzeType, ['counter' => $timeFrame]),
            ]);
        /* } catch(\Exception $e) {
            return response()->json([
                'status' => false,
                'data' => [],
                'message' => $e->getMessage()
            ]);
        } */
    }

    public function getIssues(Request $request)
    {
        set_time_limit(3600);
        try {
            $metrics = ['download', 'upload', 'ping', 'packet_loss'];
            if($request->isp)
                $isp = [$request->isp];
            else
                $isp = config('app.isps');

            foreach($isp as $item) {
                foreach ($metrics as $metric) {
                    $timeFrames = config('app.packet_loss');
                    $res = NetworkService::IspAnalyze2($item, $metric, $timeFrames);
                    if($res == [])
                        continue;
                    $result[$item][$metric] = $res;
                    $disturbance[] = $metric;
                }
            }
            $ispsHasDisturbance = array_keys($result);
            $disturbance = array_unique($disturbance);
            RstDisturbance::create([
                'isps' => json_encode($ispsHasDisturbance),
                'disturbances' => json_encode($disturbance),
                'description' => json_encode($result),
                //'created_at' => now()->toDateTimeString(),
            ]);
            return response()->json([
                'status' => true,
                'data' => $result,
                'message' => 'done',
            ]);
        } catch(\Exception $e) {
            return response()->json([
                'status' => false,
                'data' => [],
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getIssueStats(Request $request, $type)
    {
        $stats = RstDisturbance::latest()->first();
        $description = json_decode($stats->description);

        switch($type) {
            case 'stats':
                $response['issues'] = [
                    'count' => count(collect(json_decode($stats->disturbances))),
                    'names' => json_decode($stats->disturbances)
                ];
                $response['isp'] = [
                    'count' => count(collect($description)),
                    'names' => array_keys((array)$description)
                ];
                foreach ($description as $isp => $ispInfos) {
                    foreach ($ispInfos as $metric => $metricInfos) {
                        $cities[] = key($metricInfos);
                    }
                }
                $response['cities'] = [
                    'count' => count(array_unique($cities)),
                    'names' => array_unique($cities)
                ];
                break;
            case 'issues':
                foreach ($description as $isp => $ispInfos) {
                    foreach ($ispInfos as $metric => $metricInfos) {
                        $response[$metric][key($metricInfos)][] = $isp;
                    }
                }
                break;
            case 'cities':
                foreach ($description as $isp => $ispInfos) {
                    foreach ($ispInfos as $metric => $metricInfos) {
                        $response[key($metricInfos)][$metric][] = $isp;
                    }
                }
                break;
            case 'isp':
                foreach ($description as $isp => $ispInfos) {
                    foreach ($ispInfos as $metric => $metricInfos) {
                        $response[$isp][key($metricInfos)][] = $metric;
                    }
                }
                break;
            case 'info':
                if(isset($request->isp)) {
                    $isp = $request->isp;
                    $issue = $request->issue;
                    $city = $request->city;
                    $response = $description->$isp->$issue->$city;
                }else {
                    foreach ($description as $isp => $ispInfos) {
                        $response[$isp] = $ispInfos;
                    }
                }
        }


        return response()->json([
            'status' => true,
            'data' => $response,
            'message' => 'done',
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Jobs\IspPacketlossAnalysis;
use App\Jobs\IspPingAnalysis;
use App\Jobs\IspSpeedAnalysis;
use App\Models\RstIspStats;
use App\Models\RstResult;
use Illuminate\Http\Request;
use App\Models\RstServer;
use App\Services\NetworkService;
use Carbon\Carbon;
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
        try {
            $timeFrames = config('app.speed');
            list($analyzeType, $timeFrame, $report) = NetworkService::IspAnalyze($isp, 'download', $timeFrames);

            return response()->json([
                'status' => true,
                'data' => $report,
                //'message' => 'Compared to '.$timeFrame.' hour ago',
                'message' => __('messages.'.$analyzeType, ['counter' => $timeFrame]),
            ]);
        } catch(\Exception $e) {
            return response()->json([
                'status' => false,
                'data' => [],
                'message' => $e->getMessage()
            ]);
        }
    }
}

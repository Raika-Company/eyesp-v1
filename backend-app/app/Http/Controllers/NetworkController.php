<?php

namespace App\Http\Controllers;

use App\Models\RstIspStats;
use App\Models\RstResult;
use App\Services\IpInfo;
use Illuminate\Http\Request;
use App\Models\RstServer;
use App\Services\NetworkService;
use Carbon\Carbon;
use DateInterval;
use DateTime;
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
            $pingTimes[] = NetworkService::Ping($pingServer);
            $counter++;
        }

        $ping = round(min($pingTimes));
        $jitter = NetworkService::Jitter($pingTimes);

        RstResult::updateOrCreate([
            'cid' => $request->cid,
            'uuid' => $request->uid,
            'date' => today()->toDateString(),
        ],[
            'ping' => $ping,
            'jitter' => round($jitter, 0),
        ]);

        return round($ping, 0);
    }

    public function ispMetrics(Request $request)
    {
        try {
            $isp = [0 => 'irancell', 1 => 'hamrah aval', 2 => 'shatel', 3 => 'mobinnet', 4 =>'hiweb'];
            $ispMetrics = RstIspStats::where('date', '>=', Carbon::today()->subDays(7))->get();
            $totalRecord = $ispMetrics->count();
            $data['totalQualityAverage'] = round($ispMetrics->sum('total_quality_average') / $totalRecord, 0);
            $data['clients'] = $ispMetrics->sum('clients');
            $data['speedAverage'] = round($ispMetrics->sum('speed_average') / $totalRecord, 0);
            $data['pingAverage'] = round($ispMetrics->sum('ping_average') / $totalRecord, 0);

            foreach ($isp as $item) {
                $metrics = $ispMetrics->where('isp', $item);
                $count = $metrics->count();
                if($count < 1) {
                    continue;
                }
                $data['isp'][$item] = [
                    'downloadSpeedAverage' => round($metrics->sum('download_speed_average') / $count, 0),
                    'uploadSpeedAverage' => round($metrics->sum('upload_speed_average') / $count, 0),
                    'pingAverage' => round($metrics->sum('ping_average') / $count, 0),
                    'packetLoss' => round($metrics->sum('packet_loss') / $count, 0),
                    'totalQuality' => round($metrics->sum('total_quality_average') / $count, 0),
                ];
            }

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

    public function ana()
    {
        // Define your thresholds for the various metrics
        $thresholds = [
            'speed' => 10,   // example value
            'ping' => 150,   // example value in ms
            'packet_loss' => 2,  // example value in percentage
        ];

        // Replace these with actual data retrieval logic
        $trustedData = [
            'speed' => [8, 17, 15],
            'ping' => [70, 99, 120],
            'packet_loss' => [18, 2, 7],
        ];

        $userData = [
            'speed' => [10, 18, 32],
            'ping' => [20, 15, 19],
            'packet_loss' => [2, 4, 5],
        ];

        $report = NetworkService::analyzeIssues($trustedData, $userData, $thresholds);

        dd($report);
    }
}

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
    /**
     * Retrieves the client's IP address from the incoming request.
     *
     * @param Request $request The incoming HTTP request.
     * @return \Illuminate\Http\JsonResponse JSON response with status, client's IP address, and optional message.
     */
    public function getClientIp(Request $request)
    {
        try {
            // Validate that 'ip' parameter, if provided, is a valid IP address
            $validator = Validator::make($request->all(), [
                'ip' => 'sometimes|ip',
            ]);

            // If 'ip' parameter is not a valid IP address, return an error response
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'data' => [],
                    'message' => 'Invalid IP address'
                ]);
            }

            // Retrieve client's IP address from the request and return a JSON response with success status and the IP address
            return response()->json([
                'status' => true,
                'data' => ['ip' => $request->ip()],
                'message' => '',
            ]);

        } catch(\Exception $e) {
            // If an exception occurs, return an error response with the exception message
            return response()->json([
                'status' => false,
                'data' => [],
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Function that receives request data and stores it in the database.
     *
     * @param Request $request The incoming HTTP request containing the data.
     * @return \Illuminate\Http\JsonResponse JSON response with status and corresponding message.
     */
    public function setIpInfo(Request $request)
    {
        try {
            // Stores the request data in the database.
            RstResult::InsertHelloRequest((object)$request->all());

            // Returns a JSON response with success status and message.
            return response()->json([
                'status' => true,
                'message' => 'Yes, the information has been recorded!'
            ]);
        } catch(\Exception $e) {
            // In case of an error, returns a JSON response with error message and status.
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Retrieve a list of servers, ping each server to determine the best one, 
     * and return the servers along with the index of the best server.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function servers()
    {
        // Retrieve all servers from the RstServer model
        $servers = RstServer::all();
        
        // Initialize an empty array to store ping values for each server
        $ping = [];
        
        // Iterate through the servers and ping each server to measure response time
        $servers = $servers->map(function($server) use (&$ping){
            // Use the NetworkService::Ping method to ping the server's URL with a timeout of 1 second
            $ping[$server->id] = NetworkService::Ping(Str::replace(['https://', 'http://'], '', $server->url), 1);
            
            // Set the 'best_server' property of the current server to false initially
            $server->best_server = false;
            
            // Return the updated server object
            return $server;
        });
        
        // Find the key (server ID) with the minimum ping value
        $minPingKey = current(array_keys($ping, min($ping)));
        
        // Iterate through servers again to mark the server with the minimum ping as the best server
        $best_server_index = 0;
        foreach($servers as $index => $server) {
            if($server->id === $minPingKey) {
                // Set the 'best_server' property to true for the server with the minimum ping
                $server->best_server = true;
                
                // Store the index of the best server
                $best_server_index = $index;
                
                // Break the loop after finding the best server
                break;
            }
        }
        
        // Return a JSON response containing the list of servers and the index of the best server
        return response()->json(['servers' => $servers->toArray(), 'best_server_index' => $best_server_index]);
    }


    /**
     * Downloads the file from a given URL, calculates download speed, and stores it in the database.
     *
     * @param \Illuminate\Http\Request $request HTTP request containing download information (such as UID and CID).
     * @return void
     */
    public function downloadSpeed(Request $request)
    {
        // Generate download URL with user ID
        $testUrl = "https://static.kar1.net/general/kar-future-3.mp4?uuid=" . $request->uid;
        
        // Constants
        $chunkSize = 20000;
        
        // Variables initialization
        $counter = 1;
        $s = microtime();
        $mbPerSec = [];

        // Download and calculate speed
        $handle = fopen($testUrl, 'rb');
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

        // Update or create database record
        RstResult::updateOrCreate([
            'cid' => $request->cid,
            'uuid' => $request->uid,
            'date' => today()->toDateString(),
        ],[
            'download' => round(array_sum($mbPerSec) / count($mbPerSec) * 8, 2),
            'download_duration' => $duration
        ]);

        // Close file handle after download
        fclose($handle);
    }


    /**
     * Handle the upload speed test request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadSpeed(Request $request)
    {
        // Destination server address
        $upload_server = "kar1.net";

        // Data to be sent (1000kb of data)
        $data = "POST / HTTP/1.0\r\n"
            . "Host: " . $upload_server . "\r\n"
            . "\r\n"
            . str_repeat("a", 1000000);

        // Chunk size for sending data
        $chunkSize = 20000;
        $mbPerSec = [];

        // Start measuring time
        $start = microtime(true);

        // Calculate total data length
        $dataLength = strlen($data);

        // Send data in chunks
        for ($i = 0; $i < $dataLength; $i += $chunkSize) {
            $chunk = substr($data, $i, $chunkSize);
            file_get_contents("http://{$upload_server}", false, stream_context_create([
                'http' => [
                    'method' => 'POST',
                    'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                    'content' => $chunk
                ]
            ]));

            // Calculate upload speed
            $duration = microtime(true) - $start;
            $bytesPerSec = $i / $duration;
            $kbPerSec = $bytesPerSec / 1024;
            $mbPerSec[] = $kbPerSec / 1024;
            echo json_encode(round(array_sum($mbPerSec) / count($mbPerSec) * 8, 2)) . ' ';
        }

        // Store the result in database
        RstResult::updateOrCreate([
            'cid' => $request->cid,
            'uuid' => $request->uid,
            'date' => today()->toDateString(),
        ],[
            'upload' => round(array_sum($mbPerSec) / count($mbPerSec) * 8, 2),
            'upload_duration' => $duration
        ]);
    }


    /**
     * Handles the ping request and calculates average ping, packet loss, and jitter.
     *
     * @param  Request $request The incoming request object.
     * @return int Returns the rounded average ping value.
     */
    public function ping(Request $request)
    {
        // Define the ping server and initialize variables
        $pingServer = "static.kar1.net";
        $counter = 0;
        $pingTimes = [];
        $packetLoss = [];

        // Perform ping tests and collect results
        while ($counter < 10) {
            list($pingTimes[], $packetLoss[]) = NetworkService::Ping($pingServer);
            $counter++;
        }

        // Calculate average ping, total packet loss, and jitter
        $ping = round(array_sum($pingTimes) / count($pingTimes));
        $packetLoss = array_sum($packetLoss);
        $jitter = NetworkService::Jitter($pingTimes);

        // Update or create a record with ping results for the given client and date
        RstResult::updateOrCreate([
            'cid' => $request->cid,
            'uuid' => $request->uid,
            'date' => today()->toDateString(),
        ], [
            'ping' => $ping,
            'packet_loss' => $packetLoss,
            'jitter' => round($jitter, 0),
        ]);

        // Return the rounded average ping value
        return round($ping, 0);
    }


    /**
     * Calculate ISP metrics based on the last 7 days' data.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function ispMetrics(Request $request)
    {
        try {
            // Retrieve ISP data from the application configuration
            $isp = collect(config('app.isps'));

            // Retrieve ISP statistics from the database for the last 7 days
            $ispMetrics = RstIspStats::where('date', '>=', Carbon::today()->subDays(7))->get();

            // Calculate various metrics based on the retrieved data
            $data['totalQualityAverage'] = round($ispMetrics->avg('total_quality_average'), 0);
            $data['clients'] = $ispMetrics->sum('clients');
            $data['speedAverage'] = round($ispMetrics->avg('speed_average'), 0);
            $data['downloadAverage'] = round($ispMetrics->avg('download_speed_average'), 0);
            $data['uploadAverage'] = round($ispMetrics->avg('upload_speed_average'), 0);
            $data['pingAverage'] = round($ispMetrics->avg('ping_average'), 0);

            // Calculate ISP-specific metrics and organize the data in a structured format
            $data['isp'] = collect($isp)->flatMap(function ($item) use ($ispMetrics) {
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

            // Return the calculated metrics as a JSON response
            return response()->json([
                'status' => true,
                'data' => $data,
                'message' => ''
            ]);
        } catch(\Exception $e) {
            // Handle any exceptions that occur during the process and return an error response
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Retrieves city metrics based on the given city and date range.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function cityMetrics(Request $request)
    {
        try {
            // Retrieve ISP metrics for the specified city and date range
            $ispMetrics = RstCityStats::where('city', $request->city)
                ->where('date', '>=', Carbon::today()->subDays(7))->get();

            // Retrieve disturbance issues for the specified city
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

            // Prepare and return the response data
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
            // Handle exceptions and return error response
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Retrieves chart data based on the specified type, ISP, and optional city.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function charts(Request $request)
    {
        try {
            // Determine the chart type and retrieve corresponding data
            $type = $request->type;
            $rstResult = RstResult::$type($request->isp, 1);
            if($request->city) {
                $rstResult = $rstResult->where('city', $request->city);
            }

            // Prepare and return the response data
            return response()->json([
                'status' => true,
                'data' => ChartService::$type($rstResult),
                'message' => '',
            ]);
        } catch(\Exception $e) {
            // Handle exceptions and return error response
            return response()->json([
                'status' => false,
                'data' => [],
                'message' => $e->getMessage()
            ]);
        }
    }


    /**
     * Retrieve statistics based on the provided request type.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function stats(Request $request)
    {
        try {
            // Determine the type of statistics based on the request
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

            // Calculate average values and percentages for different metrics
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

            // Return the JSON response with the calculated statistics
            return response()->json([
                'status' => true,
                'data' => $response,
                'message' => '',
            ]);
        } catch(\Exception $e) {
            // Handle exceptions and return error response if an error occurs
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
                'data' => NetworkService::IspMetrics([$request->isp]),
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

<?php
namespace App\Services;

use App\Models\RstResult;
use App\Models\RstThreshold;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;

class NetworkService {

    public static function TakeTime($start, $end = null)
    {
        if (!$end) {
            $end = microtime();
        }
        list($start_usec, $start_sec) = explode(" ", $start);
        list($end_usec, $end_sec) = explode(" ", $end);
        $diff_sec = intval($end_sec) - intval($start_sec);
        $diff_usec = floatval($end_usec) - floatval($start_usec);
        return floatval($diff_sec) + $diff_usec;
    }

	public static function Ping($pingServer, $timeOut = 1)
	{
        $ip = gethostbyname($pingServer);
        $receivedPings = 0;
        $pingTimes = 0;
        $startTime = microtime(true);
        $socket = fsockopen($ip, 80, $errno, $errstr, $timeOut);

        if ($socket !== false) {
            fclose($socket);
            $endTime = microtime(true);
            $pingTimes = round(($endTime - $startTime) * 1000, 0);
            $receivedPings++;
        }

        $packetLoss = ((1 - $receivedPings));

        return [$pingTimes, $packetLoss];
	}

    public static function Jitter(array $pingTimes)
    {
        $averagePingTime = array_sum($pingTimes) / count($pingTimes);
        $jitterValues = [];
        foreach ($pingTimes as $pingTime) {
            $jitterValues[] = abs($pingTime - $averagePingTime);
        }

        return max($jitterValues);
    }

    public static function ThresholdsCalculation($isp)
    {
        $data = RstResult::whereIsp($isp)
            ->where('date', '>=', Carbon::today()->subDays(Config::get('app.thresholds_days')))
            //->whereBetween('time', explode(',', Config::get('app.thresholds_best_time')))
            ->get();
        $download = $data->avg('download');
        $upload = $data->avg('upload');
        RstThreshold::create([
            'isp' => $isp,
            'download' => round($download, 2),
            'upload' => round($upload, 2),
            'speed_avg' => round(($download + $upload) / 2, 2),
            'ping' => round($data->avg('ping')),
            'packet_loss' => round($data->avg('packet_loss')),
            'total_quality' => rand(20,100)
        ]);
    }

    public static function GetThresholds($isp)
    {
        return Cache::remember("thresholds_$isp", 60, function () use ($isp) {
            return RstThreshold::where('isp', $isp)
                ->where('created_at', '>=', Carbon::today()->subDay()->toDateTimeString())
                ->first();
        });
    }

    static function calculateAverage(Collection $data, string $metric): float
    {
        return $data->average($metric);
    }

    static function analyzeMetric(float $trustedAvg, float $userAvg, float $threshold, string $metricName, array &$report)
    {
        if ($trustedAvg > $threshold && $userAvg > $threshold) {
            $report[$metricName] = "ISP Issue";
        } elseif ($userAvg > $threshold) {
            $report[$metricName] = "User Infrastructure Issue";
        } else {
            $report[$metricName] = "No Issue";
        }
    }

    public static function CompareIspReports(Collection $reports, string $isp, string $metric)
    {
        $ispIssue = $userInfrastructureIssue = $noIssue = 0;
        foreach ($reports as $report) {
            if($reports[$isp][$metric] == 'ISP Issue' AND $report[$metric] == 'ISP Issue') {
                $ispIssue++;
            }elseif($reports[$isp][$metric] == 'User Infrastructure Issue' AND $report[$metric] == 'User Infrastructure Issue') {
                $userInfrastructureIssue++;
            }elseif($reports[$isp][$metric] == 'No Issue' AND $report[$metric] == 'No Issue') {
                $noIssue++;
            }
        }

        return [
            'ISP Issue' => $ispIssue,
            'User Infrastructure Issue' => $userInfrastructureIssue,
            'No Issue' => $noIssue
        ];
    }

    static function analyzeConsistency(Collection $trustedData, Collection $userData, float $speedThreshold, array &$report)
    {
        $timeNow = Carbon::now();
        $trustedLastHour = $trustedData;
        //$trustedLastHour = $trustedData->where('time', '>', $timeNow->subHour());
        $userLastHour = $userData;
        //$userLastHour = $userData->where('time', '>', $timeNow->subHour());
        $trustedSpeedLastHour = self::calculateAverage($trustedLastHour, 'download');
        $userSpeedLastHour = self::calculateAverage($userLastHour, 'download');

        if ($trustedSpeedLastHour < $speedThreshold && $userSpeedLastHour < $speedThreshold) {
            $report['consistency'] = "ISP Congestion Issue";
        } elseif ($userSpeedLastHour < $speedThreshold) {
            $report['consistency'] = "User Specific Congestion Issue";
        } else {
            $report['consistency'] = "No Consistency Issue";
        }
    }

    public static function GetReports($isp, $metrics)
    {
        $report = [];

        $thresholds = NetworkService::GetThresholds($isp);

        $trustedData = RstResult::where('isp', $isp)
            ->where('data_type', 'trusted')
            ->orderBy('date', 'desc')->take(10)->get();

        $userData = RstResult::where('isp', $isp)
            ->where('data_type', 'untrusted')
            ->orderBy('date', 'desc')->take(10)->get();

        foreach ($metrics as $metric) {
            $trustedAvg = NetworkService::calculateAverage($trustedData, $metric);
            $userAvg = NetworkService::calculateAverage($userData, $metric);
            NetworkService::analyzeMetric($trustedAvg, $userAvg, $thresholds->$metric, $metric, $report);
        }

        NetworkService::analyzeConsistency($trustedData, $userData, $thresholds->download, $report);

        return $report;
    }
}

?>
<?php
namespace App\Services;

use App\Models\RstIspStats;
use App\Models\RstResult;
use App\Models\RstThreshold;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;

class NetworkService
{

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
            'total_quality' => rand(20, 100)
        ]);
    }

    public static function GetThresholds($isp)
    {
        return RstThreshold::where('isp', $isp)
            ->where('created_at', '>=', Carbon::today()->subDay()->toDateTimeString())
            ->first();
    }

    public static function calculateAverage(Collection $data, string $metric): float
    {
        return $data->average($metric);
    }

    public static function analyzeMetric(float $trustedAvg, float $userAvg, float $threshold, string $metricName, array &$report)
    {
        $conditions = [
            ['condition' => fn() => $trustedAvg > $threshold && $userAvg > $threshold, 'issue' => "ISP Issue"],
            ['condition' => fn() => $userAvg > $threshold, 'issue' => "User Infrastructure Issue"],
            ['condition' => fn() => $trustedAvg > $threshold, 'issue' => "Check Trusted Data"],
            ['condition' => fn() => true, 'issue' => "No Issue"]
        ];

        foreach ($conditions as $condition) {
            if ($condition['condition']()) {
                $report[$metricName] = $condition['issue'];
                break;
            }
        }
    }

    public static function CompareIspReports(Collection $reports, string $isp, string $metric)
    {
        $issueCounts = [
            'ISP Issue' => 0,
            'User Infrastructure Issue' => 0,
            'Check Trusted Data' => 0,
            'No Consistency Issue' => 0,
            'ISP Congestion Issue' => 0,
            'User Specific Congestion Issue' => 0,
            'No Issue' => 0
        ];

        foreach ($reports as $report) {
            if (!isset($report[$metric]))
                continue;
            $ispMetric = $reports[$isp][$metric];
            $reportMetric = $report[$metric];

            // Check if both ISP and report have the same issue type
            $isSameIssue = isset($issueCounts[$ispMetric]) && $ispMetric === $reportMetric;

            // If it's the same issue type, increment the counter
            $issueCounts[$ispMetric] = $isSameIssue ? $issueCounts[$ispMetric] + 1 : $issueCounts[$ispMetric];
        }

        return $issueCounts;
    }

    public static function analyzeConsistency(Collection $trustedData, Collection $userData, float $speedThreshold, array &$report)
    {
        $timeNow = Carbon::now();
        $trustedLastHour = $trustedData;
        // $trustedLastHour = $trustedData->where('time', '>', $timeNow->subHour());
        $userLastHour = $userData;
        // $userLastHour = $userData->where('time', '>', $timeNow->subHour());
        $trustedSpeedLastHour = self::calculateAverage($trustedLastHour, 'download');
        $userSpeedLastHour = self::calculateAverage($userLastHour, 'download');

        $consistencyMapping = [
            ['condition' => fn() => $trustedSpeedLastHour < $speedThreshold && $userSpeedLastHour < $speedThreshold, 'issue' => "ISP Congestion Issue"],
            ['condition' => fn() => $userSpeedLastHour < $speedThreshold, 'issue' => "User Specific Congestion Issue"],
            ['condition' => fn() => $trustedSpeedLastHour > $speedThreshold, 'issue' => "Check Trusted Data"],
            ['condition' => fn() => true, 'issue' => "No Consistency Issue"]
        ];

        foreach ($consistencyMapping as $mapping) {
            if ($mapping['condition']()) {
                $report['consistency'] = $mapping['issue'];
                break;
            }
        }
    }

    public static function GetReports(string $isp, array $metrics)
    {
        $report = [];

        $thresholds = NetworkService::GetThresholds($isp);

        if (!$thresholds)
            return $report;

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

    public static function GetReports2(string $isp, Collection $trustedData, Collection $untrustedData, string $metric)
    {
        $report = [];

        $thresholds = NetworkService::GetThresholds($isp);

        if (!$thresholds)
            return $report;

        $trustedAvg = NetworkService::calculateAverage($trustedData, $metric);
        $userAvg = NetworkService::calculateAverage($untrustedData, $metric);
        NetworkService::analyzeMetric($trustedAvg, $userAvg, $thresholds->$metric, $metric, $report);

        return $report;
    }

    public static function IspAnalyze(string $isp, string $metric, array $timeFrames): array
    {
        $result = array_reduce(array_keys($timeFrames), function ($carry, $analyzeType) use ($isp, $metric, $timeFrames) {
            return $carry ?? array_reduce($timeFrames[$analyzeType], function ($innerCarry, $time) use ($isp, $metric, $analyzeType) {
                if ($innerCarry !== null) {
                    return $innerCarry;
                }

                $data = self::analyzeData($isp, $time, $analyzeType);
                $report = self::generateReport($isp, $data, $metric);
                return $report[$metric] !== 'No Issue' ?
                    self::comparison($isp, $analyzeType, $time, $report, $metric) :
                    null;
            });
        }, null);

        return $result ?? ['', '', '', []];
    }


    private static function analyzeData(string $isp, string $timeFrame, string $analyzeType)
    {
        /* if($analyzeType == 'hourly')
            $data = RstResult::$analyzeType($isp, $timeFrame);
        else
            $data = RstIspStats::$analyzeType($isp, $timeFrame); */
        $data = RstResult::$analyzeType($isp, $timeFrame);

        return [
            'trusted' => $data->where('data_type', 'trusted'),
            'untrusted' => $data->where('data_type', 'untrusted')
        ];
    }

    private static function generateReport(string $isp, array $data, string $metric)
    {
        return self::GetReports2($isp, $data['trusted'], $data['untrusted'], $metric);
    }

    private static function comparison($selectedIsp, $analyzeType, $time, $stat, $metric)
    {
        $issueCounts = self::initializeIssueCounts();
        $isp = config('app.isps');
        // Getting reports and count issues without looping through each ISP individually
        [$reports, $issueCounts] = self::generateReportsAndCountIssues($isp, $selectedIsp, $time, $analyzeType, $stat, $metric, $issueCounts);

        // Analyzing issues without looping through each issue count individually
        $result = self::analyzeIssuesUsingMap($stat, $issueCounts, count($isp), $metric);

        return [$analyzeType, $time, $stat, $result];
    }

    private static function generateReportsAndCountIssues($isp, $selectedIsp, $time, $analyzeType, $stat, $metric, $issueCounts)
    {
        // Assuming a map/reduce-like process could generate reports and count issues concurrently
        // Implementation would be highly context-dependent
        $reports = [];
        $filteredIsps = array_diff($isp, [$selectedIsp]);
        $dataReports = array_map(function ($item) use ($time, $analyzeType, $metric, $stat, &$issueCounts) {
            $data = self::analyzeData($item, $time, $analyzeType);
            $report = self::generateReport($item, $data, $metric);
            if ($stat[$metric] === $report[$metric]) {
                $issueCounts[$stat[$metric]]++;
            }
            return $report;
        }, $filteredIsps);

        // Assuming keys from $filteredIsps and $dataReports can be matched directly
        $reports = array_combine($filteredIsps, $dataReports);

        return [$reports, $issueCounts];
    }
    private static function initializeIssueCounts()
    {
        return [
            'ISP Issue' => 0,
            'User Infrastructure Issue' => 0,
            'ISP Congestion Issue' => 0,
            'User Specific Congestion Issue' => 0,
        ];
    }
    private static function analyzeIssuesUsingMap($stat, $issueCounts, $ispCount, $metric)
    {
        $issueMessages = [
            'ISP Issue' => ['اختلال در زیر ساخت', 'اختلال در منطقه ی کاربر'],
            'User Infrastructure Issue' => ['اختلال در منطقه ی کاربر', 'اختلال در زیر ساخت کاربر'],
            'ISP Congestion Issue' => ['اختلال در زیر ساخت', 'اختلال در منطقه ی کاربر'],
            'User Specific Congestion Issue' => ['اختلال در منطقه ی کاربر', 'اختلال در زیرساخت کاربر']
        ];

        return [
            $metric => array_map(function ($issueKey, $issueValue) use ($issueMessages, $ispCount,$stat, $metric) {
                return $issueValue <= 0
                    ? ($stat[$metric] !== $issueKey ? [$issueKey => 'اختلال خاصی مشاهده نشد'] : [$issueKey => 'اختلال صرفا در ای اس پی مورد نظر'])
                    : [$issueKey => $issueMessages[$issueKey][$issueValue >= $ispCount / 2 ? 0 : 1]];
            }, array_keys($issueCounts), array_values($issueCounts))
        ];
    }
}

?>
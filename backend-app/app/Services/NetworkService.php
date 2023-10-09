<?php
namespace App\Services;

use App\Models\RstFeedback;
use App\Models\RstIspStats;
use Carbon\Carbon;
use DateInterval;
use DateTime;

class NetworkService {

    public static function TakeTime(string $start, $end = null): float
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

	public static function Ping(string $pingServer, $timeOut = 1): array
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

    public static function Jitter(array $pingTimes): float
    {
        $averagePingTime = array_sum($pingTimes) / count($pingTimes);
        $jitterValues = [];
        foreach ($pingTimes as $pingTime) {
            $jitterValues[] = abs($pingTime - $averagePingTime);
        }

        return max($jitterValues);
    }

    public static function IspMetrics(array $isp): array
    {
        $ispMetrics = RstIspStats::whereIn('isp', $isp)
            ->where('date', '>=', Carbon::today()->subDays(7))
            ->get();

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
            $feedbacks = RstFeedback::where('isp', $item)->get();
            $feedbacksCount = $feedbacks->count();
            $data['isp'][$item] = [
                'downloadSpeedAverage' => round($metrics->sum('download_speed_average') / $count, 0),
                'uploadSpeedAverage' => round($metrics->sum('upload_speed_average') / $count, 0),
                'pingAverage' => round($metrics->sum('ping_average') / $count, 0),
                'packetLoss' => round($metrics->sum('packet_loss') / $count, 0),
                'totalQuality' => round($metrics->sum('total_quality_average') / $count, 0),
                'score' => ($feedbacksCount) ? round($feedbacks->sum('score') / $feedbacksCount, 1) : 0
            ];
        }

        return $data;
    }

    public static function analyzeIssues($trustedData, $userData, $thresholds)
    {
        $report = [];

        // Speed Analysis
        $trustedSpeedAvg = array_sum($trustedData['speed']) / count($trustedData['speed']);
        $userSpeedAvg = array_sum($userData['speed']) / count($userData['speed']);

        if ($trustedSpeedAvg < $thresholds['speed'] && $userSpeedAvg < $thresholds['speed']) {
            $report['speed'] = "ISP Issue";
        } elseif ($userSpeedAvg < $thresholds['speed']) {
            $report['speed'] = "User Infrastructure Issue";
        } else {
            $report['speed'] = "No Issue";
        }

        // Ping Analysis
        $trustedPingAvg = array_sum($trustedData['ping']) / count($trustedData['ping']);
        $userPingAvg = array_sum($userData['ping']) / count($userData['ping']);

        if ($trustedPingAvg > $thresholds['ping'] && $userPingAvg > $thresholds['ping']) {
            $report['ping'] = "ISP Issue";
        } elseif ($userPingAvg > $thresholds['ping']) {
            $report['ping'] = "User Infrastructure Issue";
        } else {
            $report['ping'] = "No Issue";
        }

        // Packet Loss Analysis
        $trustedPacketLossAvg = array_sum($trustedData['packet_loss']) / count($trustedData['packet_loss']);
        $userPacketLossAvg = array_sum($userData['packet_loss']) / count($userData['packet_loss']);

        if ($trustedPacketLossAvg > $thresholds['packet_loss'] && $userPacketLossAvg > $thresholds['packet_loss']) {
            $report['packet_loss'] = "ISP Issue";
        } elseif ($userPacketLossAvg > $thresholds['packet_loss']) {
            $report['packet_loss'] = "User Infrastructure Issue";
        } else {
            $report['packet_loss'] = "No Issue";
        }

        // Consistency Over Time
        $timeNow = new DateTime();
        $trustedLastHour = array_filter($trustedData, function($row) use ($timeNow) {
            $time = new DateTime($row['time']);
            return $time > $timeNow->sub(new DateInterval('PT1H'));
        });

        $userLastHour = array_filter($userData, function($row) use ($timeNow) {
            $time = new DateTime($row['time']);
            return $time > $timeNow->sub(new DateInterval('PT1H'));
        });

        $trustedSpeedLastHour = array_sum($trustedLastHour['speed']) / count($trustedLastHour['speed']);
        $userSpeedLastHour = array_sum($userLastHour['speed']) / count($userLastHour['speed']);

        if ($trustedSpeedLastHour < $thresholds['speed'] && $userSpeedLastHour < $thresholds['speed']) {
            $report['consistency'] = "ISP Congestion Issue";
        } elseif ($userSpeedLastHour < $thresholds['speed']) {
            $report['consistency'] = "User Specific Congestion Issue";
        } else {
            $report['consistency'] = "No Consistency Issue";
        }

        return $report;
    }

}

?>
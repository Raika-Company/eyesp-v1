<?php
namespace App\Services;

class NetworkService {

	public static function Ping($pingServer, $timeOut = 1)
	{
        $timeBeginning = microtime(true);
        @fSockOpen($pingServer, 80, $errno, $errstr, $timeOut);
        $timeOver = microtime(true);

		return (($timeOver - $timeBeginning) * 1000);
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

}

?>
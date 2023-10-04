<?php
namespace App\Services;

class NetworkService {

	public static function Ping($pingServer, $count = 10) : array
	{
        $counter = 0;
        $pings = [];
        while($counter < $count) {
            $timeBeginning = microtime(true);
            @fSockOpen($pingServer, 80, $errno, $errstr, 10);
            $timeOver = microtime(true);
            $pings[] = (($timeOver - $timeBeginning) * 1000);
            $counter++;
        }

		return $pings;
	}

}

?>
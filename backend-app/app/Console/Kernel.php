<?php

namespace App\Console;

use App\Services\NetworkService;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $isp = [0 => 'irancell', 1 => 'hamrah aval', 2 => 'shatel', 3 => 'mobinnet', 4 =>'hiweb'];
        foreach($isp as $item)
            $schedule->command('thresholds:calc '.$item)
                ->dailyAt('00:00');
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}

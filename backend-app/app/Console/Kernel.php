<?php

namespace App\Console;

use App\Jobs\IspAnalysis;
use App\Services\NetworkService;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Str;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $isp = config('app.isps');
        foreach($isp as $item) {
            //Update Thresholds
            $schedule->command('thresholds:calc '.Str::replace(' ', '_', $item))
                ->dailyAt('00:00');

            //Isp Analysis Stats
            $schedule->job(new IspAnalysis($item))->everyFifteenMinutes();
        }
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

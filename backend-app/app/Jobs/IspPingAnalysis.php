<?php

namespace App\Jobs;

use App\Services\NetworkService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class IspPingAnalysis implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $isp;
    /**
     * Create a new job instance.
     */
    public function __construct($isp)
    {
        $this->isp = $isp;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $timeFrames = config('app.ping');
        list($analyzeType, $timeFrame, $reports) = NetworkService::IspAnalyze($this->isp, 'ping', $timeFrames);
    }
}

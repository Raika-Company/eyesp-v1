<?php

namespace App\Jobs;

use App\Services\NetworkService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class IspAnalysis implements ShouldQueue
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
        $metrics = ['download', 'ping', 'packet_loss'];
        $report = NetworkService::GetReports($this->isp, $metrics);

        // Map metrics to their respective dispatch methods
        $metricActions = [
            'download' => [IspSpeedAnalysis::class, 'No Issue'],
            'ping' => [IspPingAnalysis::class, 'No Issue'],
            'packet_loss' => [IspPacketlossAnalysis::class, 'No Issue'],
        ];

        array_walk($metricActions, function ($actionAndCondition, $metric) use ($report) {
            [$actionClass, $noIssueConstant] = $actionAndCondition;
            // Check if the report has an issue for the current metric
            if ($report[$metric] !== $noIssueConstant) {
                // Dispatch the related action
                dispatch(new $actionClass($this->isp));
            }
        });
    }
}

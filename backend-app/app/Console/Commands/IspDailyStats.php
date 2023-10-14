<?php

namespace App\Console\Commands;

use App\Models\RstIspStats;
use App\Models\RstResult;
use App\Models\RstThreshold;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;

class IspDailyStats extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stats:daily {isp}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'get isp daily stats';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $data = RstResult::where('isp', $this->argument('isp'))
            ->where('date', Carbon::today()->subDay()->toDateString())
            ->get();

        $trustedData = $data->where('data_type', 'trusted');
        $untrustedData = $data->where('data_type', 'untrusted');
        $trustDownloadAvg = $trustedData->avg('download');
        $untrustDownloadAvg = $untrustedData->avg('download');
        $trustUploadAvg = $trustedData->avg('upload');
        $untrustUploadAvg = $untrustedData->avg('upload');

        RstIspStats::insert([
            [
                'isp' => $this->argument('isp'),
                'clients' => $trustedData->count(),
                'speed_average' => round(($trustDownloadAvg + $trustUploadAvg) / 2, 2),
                'download_speed_average' => round($trustDownloadAvg, 2),
                'upload_speed_average' => round($trustUploadAvg, 2),
                'packet_loss' => round($trustedData->avg('packet_loss'), 2),
                'ping_average' => round($trustedData->avg('packet_loss'), 2),
                'total_quality_average' => rand(0, 100),
                'date' => Carbon::today()->subDay()->toDateString(),
                'data_type' => 'trusted',
            ],
            [
                'isp' => $this->argument('isp'),
                'clients' => $untrustedData->count(),
                'speed_average' => round(($untrustDownloadAvg + $untrustUploadAvg) / 2, 2),
                'download_speed_average' => round($untrustDownloadAvg, 2),
                'upload_speed_average' => round($untrustUploadAvg, 2),
                'packet_loss' => round($untrustedData->avg('packet_loss'), 2),
                'ping_average' => round($untrustedData->avg('packet_loss'), 2),
                'total_quality_average' => rand(0, 100),
                'date' => Carbon::today()->subDay()->toDateString(),
                'data_type' => 'untrusted',
            ],
        ]);
    }
}

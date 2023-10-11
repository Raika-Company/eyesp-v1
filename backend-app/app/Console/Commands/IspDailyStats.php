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
                'download_speed_average' => $trustDownloadAvg,
                'upload_speed_average' => $trustUploadAvg,
                'packet_loss' => $trustedData->avg('packet_loss'),
                'ping_average' => $trustedData->avg('packet_loss'),
                'total_quality_average' => rand(0, 100),
                'date' => Carbon::today()->subDay()->toDateString(),
                'data_type' => 'trusted',
            ],
            [
                'isp' => $this->argument('isp'),
                'clients' => $untrustedData->count(),
                'speed_average' => round(($untrustDownloadAvg + $untrustUploadAvg) / 2, 2),
                'download_speed_average' => $untrustDownloadAvg,
                'upload_speed_average' => $untrustUploadAvg,
                'packet_loss' => $untrustedData->avg('packet_loss'),
                'ping_average' => $untrustedData->avg('packet_loss'),
                'total_quality_average' => rand(0, 100),
                'date' => Carbon::today()->subDay()->toDateString(),
            ],
        ]);
    }
}

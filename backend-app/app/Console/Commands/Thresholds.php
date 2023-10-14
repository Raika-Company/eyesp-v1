<?php

namespace App\Console\Commands;

use App\Models\RstResult;
use App\Models\RstThreshold;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;

class Thresholds extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'thresholds:calc {isp}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'get isp thresholds';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $isp = \Illuminate\Support\Str::replace('_', ' ', $this->argument('isp'));
        $data = RstResult::where('isp', $isp)
            ->where('data_type', 'trusted')
            ->where('date', '>=', Carbon::today()->subDays(Config::get('app.thresholds_days'))->toDateString())
            ->whereBetween('time', explode(',', Config::get('app.thresholds_best_time')))
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
            'total_quality' => rand(20,100)
        ]);
    }
}

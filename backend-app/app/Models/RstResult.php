<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RstResult extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'cid',
        'uuid',
        'date',
        'time',
        'type',
        'servers',
        'ip',
        'isp',
        'country',
        'city',
        'lat',
        'lon',
        'ping',
        'packet_loss',
        'download',
        'download_duration',
        'upload',
        'upload_duration',
        'jitter',
        'data_type',
    ];

    public static function InsertHelloRequest($ipInfo)
    {
        self::updateOrCreate([
            'uuid' => $ipInfo->uid,
            'cid' => $ipInfo->cid,
            'date' => today()->toDateString(),
            'ip' => $ipInfo->ip,
        ],[
            'time' => now()->toTimeString(),
            'country' => $ipInfo->country,
            'city' => $ipInfo->city,
            'isp' => $ipInfo->isp,
            'lat' => $ipInfo->lat,
            'lon' => $ipInfo->lon,
            'type' => $ipInfo->test_type,
        ]);
    }

    public static function hourly($isp, $hours)
    {
        return self::where('isp', $isp)
            ->where('date', now()->toDateString())
            ->where('time', '>=', now()->subHours($hours)->toTimeString())->get();
    }

    public static function daily($isp, $days)
    {
        return self::where('isp', $isp)
            ->where('date', '>=', now()->subDays($days)->toDateString())
            ->get();
    }

    public static function weekly($isp, $weeks)
    {
        return self::where('isp', $isp)
            ->where('date', '>=', now()->subWeeks($weeks)->toDateString())
            ->get();
    }

    public static function monthly($isp, $months)
    {
        return self::where('isp', $isp)
            ->where('date', '>=', now()->subMonths($months)->toDateString())
            ->get();
    }

    public static function yearly($isp, $years)
    {
        return self::where('isp', $isp)
            ->where('date', now()->subYears($years)->toDateString())
            ->get();
    }
}

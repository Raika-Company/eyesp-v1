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

    public static function recent($isp = null, $countInMinute = 15)
    {
        $res = self::where('date', now()->toDateString())
            ->where('time', '>=', now()->subMinutes($countInMinute)->toTimeString());
        if($isp) {
            $res = $res->where('isp', $isp);
        }
        return $res->get();
    }

    public static function hourly($isp = null, $hours)
    {
        $res = self::where('date', now()->toDateString())
            ->where('time', '>=', now()->subHours($hours)->toTimeString());
        if($isp) {
            $res = $res->where('isp', $isp);
        }
        return $res->get();
    }

    public static function today($isp = null, $temp)
    {
        $res = self::where('date', now()->toDateString());
        if($isp) {
            $res = $res->where('isp', $isp);
        }
        return $res->get();
    }

    public static function daily($isp = null, $days)
    {
        $res = self::where('date', '>=', now()->subDays($days)->toDateString());
        if($isp) {
            $res = $res->where('isp', $isp);
        }
        return $res->get();
    }

    public static function weekly($isp = null, $weeks)
    {
        $res = self::where('date', '>=', now()->subWeeks($weeks)->toDateString());
        if($isp) {
            $res = $res->where('isp', $isp);
        }
        return $res->get();
    }

    public static function monthly($isp = null, $months)
    {
        $res = self::where('date', '>=', now()->subMonths($months)->toDateString());
        if($isp) {
            $res = $res->where('isp', $isp);
        }
        return $res->get();
    }

    public static function year($isp = null, $years)
    {
        $res = self::where('date', '>=', now()->format('Y').'-01-01');
        if($isp) {
            $res = $res->where('isp', $isp);
        }
        return $res->get();
    }

    public static function yearly($isp = null, $years)
    {
        $res = self::where('date', now()->subYears($years)->toDateString());
        if($isp) {
            $res = $res->where('isp', $isp);
        }
        return $res->get();
    }
}

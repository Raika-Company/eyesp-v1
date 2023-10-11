<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RstIspStats extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'isp',
        'clients',
        'speed_average',
        'download_speed_average',
        'upload_speed_average',
        'packet_loss',
        'ping_average',
        'total_quality_average',
        'disturbance',
        'date',
        'data_type'
    ];

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

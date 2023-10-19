<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RstCityStats extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'city',
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

    public static function daily($city, $days)
    {
        return self::where('city', $city)
            ->where('date', '>=', now()->subDays($days)->toDateString())
            ->get();
    }

    public static function weekly($city, $weeks)
    {
        return self::where('city', $city)
            ->where('date', '>=', now()->subWeeks($weeks)->toDateString())
            ->get();
    }

    public static function monthly($city, $months)
    {
        return self::where('city', $city)
            ->where('date', '>=', now()->subMonths($months)->toDateString())
            ->get();
    }

    public static function yearly($city, $years)
    {
        return self::where('city', $city)
            ->where('date', now()->subYears($years)->toDateString())
            ->get();
    }
}

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
        'packet_lost',
        'ping_average',
        'total_quality_average',
        'disturbance',
        'date'
    ];
}

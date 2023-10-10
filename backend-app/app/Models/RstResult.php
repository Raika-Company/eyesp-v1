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
}

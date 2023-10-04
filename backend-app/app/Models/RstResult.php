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
        'duration',
        'type',
        'servers',
        'ip',
        'isp',
        'country',
        'city',
        'lat',
        'lon',
        'ping',
        'download',
        'upload',
        'jitter',
    ];

    public static function InsertHelloRequest($cid, $uid, $ipInfo)
    {
        self::updateOrCreate([
            'uuid' => $uid,
            'cid' => $cid,
            'date' => today()->toDateString(),
            //'ip' => $request->getClientIp(),
            'ip' => $ipInfo->query,
        ],[
            'time' => now()->toTimeString(),
            'country' => $ipInfo->countryCode,
            'city' => $ipInfo->city,
            'isp' => $ipInfo->org,
            'lat' => $ipInfo->lat,
            'lon' => $ipInfo->lon,
        ]);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RstThreshold extends Model
{
    use HasFactory;

    public $timestamps = false;

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->created_at = $model->freshTimestamp();
        });
    }

    protected $fillable = [
        'isp',
        'speed_avg',
        'download',
        'upload',
        'packet_loss',
        'ping',
        'total_quality',
    ];
}

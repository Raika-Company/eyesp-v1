<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RstReport extends Model
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
        'cid',
        'isp',
        'province',
        'city',
        'description'
    ];

    public static function InsertReport($data)
    {
        return self::create([
            'cid' => $data->cid,
            'isp' => $data->isp,
            'province' => $data->province,
            'city' => $data->city,
            'description' => $data->description,
        ]);
    }
}

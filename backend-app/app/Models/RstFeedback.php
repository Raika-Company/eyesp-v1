<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RstFeedback extends Model
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
        'score',
    ];

    public static function InsertFeedback($data)
    {
        return self::create([
            'cid' => $data->cid,
            'isp' => $data->isp,
            'score' => $data->score,
        ]);
    }
}

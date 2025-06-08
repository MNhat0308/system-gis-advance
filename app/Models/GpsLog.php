<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GpsLog extends Model
{
    protected $fillable = ['bus_id', 'location', 'speed_kmph', 'log_time'];

    protected $casts = [
        'location' => 'string',
        'log_time' => 'datetime',
    ];

    public function bus()
    {
        return $this->belongsTo(Bus::class);
    }
}

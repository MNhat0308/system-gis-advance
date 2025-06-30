<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Stop extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'route_variant_id',
        'station_id',
        'order',
    ];

    public function stations()
    {
        return $this->belongsToMany(Station::class);
    }
}

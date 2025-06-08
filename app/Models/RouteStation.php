<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RouteStation extends Model
{
    use SoftDeletes;

    protected $fillable = ['route_id', 'station_id', 'stop_order', 'estimated_arrival', 'estimated_departure'];

    public function route()
    {
        return $this->belongsTo(Route::class);
    }

    public function station()
    {
        return $this->belongsTo(Station::class);
    }
}

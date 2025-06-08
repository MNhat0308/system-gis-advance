<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bus extends Model
{
    use SoftDeletes;
    protected $fillable = ['plate_number', 'capacity', 'model', 'status', 'current_location', 'assigned_route_id'];

    protected $casts = [
        'current_location' => 'string',
    ];

    public function route()
    {
        return $this->belongsTo(Route::class, 'assigned_route_id');
    }

    public function driver()
    {
        return $this->hasOne(Driver::class, 'assigned_bus_id');
    }

    public function gpsLogs()
    {
        return $this->hasMany(GpsLog::class);
    }

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Route extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'code',
        'description',
        'is_active',
        'path',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'path' => 'string',
        ];
    }

    public function routeStations()
    {
        return $this->hasMany(RouteStation::class);
    }

    public function stations()
    {
        return $this->belongsToMany(Station::class, 'route_stations')->withTimestamps();
    }

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }

    public function buses()
    {
        return $this->hasMany(Bus::class, 'assigned_route_id');
    }
}

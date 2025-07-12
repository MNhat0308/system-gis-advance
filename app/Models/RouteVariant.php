<?php

namespace App\Models;

use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RouteVariant extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'route_id',
        'is_outbound',
        'name',
        'distance',
        'start_stop',
        'end_stop',
        'path_line',
    ];

    protected function casts(): array
    {
        return [
            'is_outbound' => 'boolean',
        ];
    }

    protected $hidden = ['deleted_at'];

    public function schedules(): \Illuminate\Database\Eloquent\Relations\HasMany|RouteVariant
    {
        return $this->hasMany(Schedule::class);
    }

    public function stops()
    {
        return $this->hasMany(Stop::class);
    }

    public function getGeojsonAttribute()
    {
        if (! $this->path_line) {
            return null;
        }

        $result = DB::selectOne('SELECT ST_AsGeoJSON(?) AS geojson', [$this->path_line]);

        return $result ? json_decode($result->geojson) : null;
    }
}

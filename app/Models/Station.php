<?php

namespace App\Models;

use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Station extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'address',
        'zone',
        'location',
    ];

    protected function casts(): array
    {
        return [
            'location' => 'string',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    protected $hidden = ['deleted_at'];

    public function stops()
    {
        return $this->hasMany(Stop::class);
    }

    public function getGeojsonAttribute()
    {
        if (! $this->location) {
            return null;
        }

        $result = DB::selectOne('SELECT ST_AsGeoJSON(?) AS geojson', [$this->location]);

        return $result ? json_decode($result->geojson) : null;
    }
}

<?php

namespace App\Models;

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
}

<?php

namespace App\Models;

use App\Enums\BusType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
        'type',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'path' => 'string',
            'type' => BusType::class,
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    protected $hidden = ['deleted_at'];

    public function routeVariants(): HasMany
    {
        return $this->hasMany(RouteVariant::class);
    }
}

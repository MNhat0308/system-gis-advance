<?php

namespace App\Models;

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
        ];
    }
}

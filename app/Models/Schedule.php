<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Schedule extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'route_variant_id',
        'start_date',
        'end_date',
        'priority',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
        ];
    }

    protected $hidden = ['deleted_at'];

    public function trips()
    {
        return $this->hasMany(ScheduleTrips::class);
    }
}

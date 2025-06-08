<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Trip extends Model
{
    protected $fillable = [
        'route_id', 'bus_id', 'driver_id',
        'scheduled_start', 'actual_start',
        'scheduled_end', 'actual_end', 'status'
    ];

    public function route()
    {
        return $this->belongsTo(Route::class);
    }

    public function bus()
    {
        return $this->belongsTo(Bus::class);
    }

    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }
}

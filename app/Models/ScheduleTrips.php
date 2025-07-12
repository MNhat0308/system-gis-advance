<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ScheduleTrips extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'schedule_id',
        'order',
        'start_time',
        'end_time',
    ];

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ScheduleDay extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'schedule_id',
        'day',
    ];
}

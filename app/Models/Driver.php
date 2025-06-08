<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Driver extends Model
{
    use SoftDeletes;
    protected $fillable = ['name', 'license_number', 'phone', 'assigned_bus_id', 'shift_start', 'shift_end'];

    public function bus()
    {
        return $this->belongsTo(Bus::class, 'assigned_bus_id');
    }

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }
}

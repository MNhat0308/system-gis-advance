<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class DetailRoute extends Model
{
    protected $table = 'detail_routes';
    protected $fillable = [
        'route_id',
        'inbound_desc',
        'outbound_desc',
        'num_of_seats',
        'org',
        'distance',
        'time_of_trip',
        'operation_time',
        'total_trip',
        'tickets'
    ];

    public function route()
    {
        return $this->belongsTo(Route::class);
    }
}

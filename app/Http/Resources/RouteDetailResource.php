<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RouteDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {

        return [
            'id' => $this->id,
            'inbound_description' => $this->inbound_desc,
            'outbound_description' => $this->outbound_desc,
            'number_of_seats' => $this->num_of_seats,
            'organization' => $this->org,
            'distance' => $this->distance,
            'time_of_trip' => $this->time_of_trip,
            'operation_time' => $this->operation_time,
            'total_trip' => $this->total_trip,
            'tickets' => $this->tickets,
        ];
    }}

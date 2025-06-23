<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleTripResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        return [
            'id'         => $this->id,
            'schedule_id'=> $this->schedule_id,
            'order'      => $this->order,
            'start_time' => $this->start_time,
            'end_time'   => $this->end_time,
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RouteVariantResource extends JsonResource
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
            'name' => $this->name,
            'schedules' => ScheduleResource::collection($this->whenLoaded('schedules')),
            'stops' => StopResource::collection($this->whenLoaded('stops')),
        ];
    }}

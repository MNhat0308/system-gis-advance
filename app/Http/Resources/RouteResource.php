<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RouteResource extends JsonResource
{
    public static $wrap = null;

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
            'active' => $this->is_active ? 'active' : 'inactive',
            'code' => $this->code,
            'type' => $this->type,
            'route_variants' => RouteVariantResource::collection($this->whenLoaded('routeVariants')),
        ];
    }

}

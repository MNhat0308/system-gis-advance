<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RadiusAreaResource extends JsonResource
{
    /**
     * @param Request $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'type' => 'Feature',
            'geometry' => [
                'type' => 'Polygon',
                'coordinates' => [$coordinates],
            ],
            'properties' => [
                'radius' => $this->resource['radius'],
                'center' => [
                    $this->resource['lng'],
                    $this->resource['lat'],
                ],
            ],
        ];
    }
}

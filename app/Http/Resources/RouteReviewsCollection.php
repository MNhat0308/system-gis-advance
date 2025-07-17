<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\ResourceCollection;

class RouteReviewsCollection extends ResourceCollection
{
    public static $wrap = null;

    public function toArray($request)
    {
        return $this->collection->map(function ($item) {
            return [
                'id' => $item->id,
                'user' => $item->user->name ?? 'Ẩn danh',
                'rating' => $item->rating,
                'comment' => $item->comment,
                'created_at' => Carbon::parse($item->created_at)->format('d/m/Y H:m'),
            ];
        });
    }

    public function with($request)
    {
        return [
            'meta' => [
                'total' => $this->total(),
                'per_page' => $this->perPage(),
                'current_page' => $this->currentPage(),
                'last_page' => $this->lastPage(),
            ],
        ];
    }
}

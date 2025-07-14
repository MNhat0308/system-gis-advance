<?php

namespace App\Http\Controllers;

use App\Http\Resources\RouteReviewsCollection;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        return Review::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['nullable', 'integer'],
            'route_id' => ['required', 'integer'],
            'rating' => ['required', 'integer'],
            'comment' => ['nullable'],
        ]);

        return Review::create($data);
    }

    public function show(Review $review)
    {
        return $review;
    }

    public function update(Request $request, Review $review)
    {
        $data = $request->validate([
            'user_id' => ['nullable', 'integer'],
            'route_id' => ['required', 'integer'],
            'rating' => ['required', 'integer'],
            'comment' => ['nullable'],
        ]);

        $review->update($data);

        return $review;
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json();
    }

    public function getReviewByRoute(Request $request, string $routeId): RouteReviewsCollection
    {
        $reviews = Review::where('route_id', $routeId)
            ->with(['user'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return new RouteReviewsCollection($reviews);
    }

    public function getAverageReviewByRoute(Request $request, string $routeId): JsonResponse
    {
        $countRating = Review::where('route_id', $routeId)
            ->count();
        $averageRating = Review::where('route_id', $routeId)
            ->avg('rating');
        $averageRating = round($averageRating, 2);

        return response()->json([
            'average_rating' => $averageRating,
            'count_rating' => $countRating,
        ]);
    }

    public function storeRouteReview(Request $request, string $routeId)
    {
        $data = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['required', 'string', 'min:5', 'max:500'],
        ]);

        $review = Review::create([
            'user_id' => $request->user()->id,
            'route_id' => $routeId,
            'rating' => $data['rating'],
            'comment' => $data['comment'],
        ]);

        return response()->json([
            'message' => 'Review created successfully',
            'data' => $review,
        ], 201);
    }
}

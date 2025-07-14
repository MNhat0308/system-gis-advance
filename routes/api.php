<?php

use App\Http\Controllers\AuthApiController;
use App\Http\Controllers\MapController;
use App\Http\Controllers\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('route/{routeId}', [MapController::class, 'showRoute'])->name('api.routes.show');
Route::get('routes/{routeId}/reviews', [ReviewController::class, 'getReviewByRoute'])->name('api.routes.reviews');

Route::get('routes/{routeId}/reviews/average', [ReviewController::class, 'getAverageReviewByRoute'])->name('api.routes.average_reviews');

Route::get('stations/nearby', [MapController::class, 'findNearbyStations'])->name('api.stations.nearby');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('routes/{routeId}/reviews', [ReviewController::class, 'storeRouteReview'])->name('api.routes.review.store');
});

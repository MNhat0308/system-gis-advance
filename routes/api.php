<?php

use App\Http\Controllers\MapController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('route/{routeId}', [MapController::class, 'showRoute'])->name('api.routes.show');

Route::get('stations/nearby', [MapController::class, 'findNearbyStations'])->name('api.stations.nearby');

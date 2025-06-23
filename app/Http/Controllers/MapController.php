<?php


namespace App\Http\Controllers;

use App\Http\Resources\RouteResource;
use App\Models\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapController extends Controller
{
    public function index()
    {
        $routes = Route::orderBy('id')->get();

        return Inertia::render('Map/BusMap', [
            'routes' => $routes->map->only(['id', 'name', 'code', 'type']),
        ]);

    }

    public function showRoute(Request $request, $routeId)
    {
        $route = Route::with([
            "routeVariants.schedules.trips",
            "routeVariants.stops.station"
        ])->findOrFail($routeId);

        return new RouteResource($route);
    }
}

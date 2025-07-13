<?php


namespace App\Http\Controllers;

use App\Http\Resources\RouteResource;
use App\Models\Route;
use App\Models\RouteVariant;
use App\Models\Station;
use DB;
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
            "routeVariants.stops.station",
            "routeDetails"
        ])->findOrFail($routeId);

        return new RouteResource($route);
    }

    public function findNearbyStations(Request $request)
    {
        $latitude =data_get($request, 'lat');
        $longitude = data_get($request, 'lng');
        $radius =data_get($request, 'radius', 1000);

        $pointSql = "ST_SetSRID(ST_MakePoint($longitude, $latitude), 4326)::geography";

        $stations = Station::whereRaw("ST_DWithin(location::geography, $pointSql, ?)", [$radius])
            ->orderByRaw("ST_Distance(location::geography, $pointSql)")
            ->get();

        $routes = Route::whereHas('routeVariants', function ($query) use ($pointSql, $radius) {
            $query->whereNotNull('path_line')
                ->whereRaw("ST_DWithin(path_line::geography, $pointSql, ?)", [$radius]);
        })->orderBy('id')->get();

        return response()->json([
            'stations' => $stations,
            'routes' => $routes->map->only(['id', 'name', 'code', 'type']),
        ]);
    }
}

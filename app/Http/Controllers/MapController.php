<?php


namespace App\Http\Controllers;

use App\Models\Route;
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
}

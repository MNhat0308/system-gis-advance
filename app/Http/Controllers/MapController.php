<?php


namespace App\Http\Controllers;

use Inertia\Inertia;

class MapController extends Controller
{
    public function index()
    {
        return Inertia::render('Map/BusMap', [
        ]);

    }
}

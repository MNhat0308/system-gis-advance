<?php

#[AllowDynamicProperties] class MapService
{
    function __construct()
    {
        $this->routeRepo = app(\App\Models\Route::class);
    }

    public function show($id)
    {
        return $this->routeRepo->firstOrFail($id);
    }

    public function getRouteByid($id)
    {
        $routes = $this->routeRepo->scopes([
            'routeVariants',
        ])->findOrFail($id);

        dd('MapService.php | 21 | 0:12', $routes);
    }
}

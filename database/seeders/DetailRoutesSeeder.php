<?php

namespace Database\Seeders;

use App\Models\DetailRoute;
use App\Models\Route;
use Illuminate\Database\Seeder;

class DetailRoutesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = file_get_contents(database_path('data/routes.json')); // update path as needed
        $routesData = json_decode($json, true);

        foreach ($routesData as $data) {
            // Try to find the route by code
            $route = Route::where('code', $data['code'])->first();

            if (!$route) {
                echo "Skipping: Route with code {$data['code']} not found.\n";
                continue;
            }

            // Insert or update the detail route
            DetailRoute::updateOrCreate(
                ['route_id' => $route->id],
                [
                    'inbound_desc' => $data['inbound_desc'] ?? null,
                    'outbound_desc' => $data['outbound_desc'] ?? null,
                    'num_of_seats' => $data['num_of_seats'] ?? null,
                    'org' => strip_tags($data['org'] ?? ''),
                    'distance' => $data['distance'] ?? null,
                    'time_of_trip' => $data['time_of_trip'] ?? null,
                    'operation_time' => $data['operation_time'] ?? null,
                    'total_trip' => $data['total_trip'] ?? null,
                    'tickets' => $data['tickets'] ?? null,
                ]
            );

            echo "Inserted/Updated detail for route {$data['code']}.\n";
        }
    }
}

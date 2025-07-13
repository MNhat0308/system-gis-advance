<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\Route;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $routes = Route::whereIn('id', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])->pluck('id')->all();
        if (empty($routes)) {
            echo "No routes found to attach reviews.\n";
            return;
        }

        for ($i = 0; $i < 500; $i++) {
            Review::create([
                'route_id' => $routes[array_rand($routes)],
                'user_id' => 1, // Assuming user with ID 1 exists
                'rating' => random_int(1, 5),
                'comment' => fake()->sentence(random_int(8, 20)),
                'created_at' => now()->subDays(random_int(0, 30)),
            ]);
        }

        echo "✅ Inserted 100 fake reviews.\n";
    }
}

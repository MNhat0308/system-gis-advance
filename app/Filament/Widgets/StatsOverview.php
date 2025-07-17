<?php

namespace App\Filament\Widgets;

use App\Models\Route;
use App\Models\RouteVariant;
use App\Models\Review;
use App\Models\Station;
use App\Models\Stop;
use Filament\Support\Enums\IconPosition;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;

class StatsOverview extends BaseWidget
{
    protected function getCards(): array
    {
        return [
            Stat::make('Total Routes', Route::count()),

            Stat::make('Total Variants', RouteVariant::count()),

            Stat::make('Total Reviews', Review::count()),

            Stat::make('Avg Rating', number_format(Review::avg('rating'), 1))
                ->description('Across all reviews')
                ->color('success'),

            Stat::make('Total Stations', Station::count()),

            Stat::make('Total Stops', Stop::count()),

            Stat::make('Avg Distance', number_format(RouteVariant::avg('distance'), 2) . ' km')
                ->description('Avg of all route variants'),
        ];
    }
}

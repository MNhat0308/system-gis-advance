<?php

namespace App\Filament\Resources\ScheduleTripsResource\Pages;

use App\Filament\Resources\ScheduleTripsResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListScheduleTrips extends ListRecords
{
    protected static string $resource = ScheduleTripsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}

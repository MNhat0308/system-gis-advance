<?php

namespace App\Filament\Resources\ScheduleTripsResource\Pages;

use App\Filament\Resources\ScheduleTripsResource;
use Filament\Resources\Pages\CreateRecord;

class CreateScheduleTrips extends CreateRecord
{
    protected static string $resource = ScheduleTripsResource::class;

    protected function getHeaderActions(): array
    {
        return [

        ];
    }
}

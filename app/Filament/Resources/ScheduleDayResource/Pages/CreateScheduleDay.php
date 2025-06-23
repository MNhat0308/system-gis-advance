<?php

namespace App\Filament\Resources\ScheduleDayResource\Pages;

use App\Filament\Resources\ScheduleDayResource;
use Filament\Resources\Pages\CreateRecord;

class CreateScheduleDay extends CreateRecord
{
    protected static string $resource = ScheduleDayResource::class;

    protected function getHeaderActions(): array
    {
        return [

        ];
    }
}

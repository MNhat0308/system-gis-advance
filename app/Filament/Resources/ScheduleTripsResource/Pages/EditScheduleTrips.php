<?php

namespace App\Filament\Resources\ScheduleTripsResource\Pages;

use App\Filament\Resources\ScheduleTripsResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Resources\Pages\EditRecord;

class EditScheduleTrips extends EditRecord
{
    protected static string $resource = ScheduleTripsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
            ForceDeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}

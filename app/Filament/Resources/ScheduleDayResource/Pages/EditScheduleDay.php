<?php

namespace App\Filament\Resources\ScheduleDayResource\Pages;

use App\Filament\Resources\ScheduleDayResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Resources\Pages\EditRecord;

class EditScheduleDay extends EditRecord
{
    protected static string $resource = ScheduleDayResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
            ForceDeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}

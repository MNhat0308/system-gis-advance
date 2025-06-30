<?php

namespace App\Filament\Resources\ScheduleDayResource\Pages;

use App\Filament\Resources\ScheduleDayResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListScheduleDays extends ListRecords
{
    protected static string $resource = ScheduleDayResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}

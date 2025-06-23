<?php

namespace App\Filament\Resources\routeVariantResource\Pages;

use App\Filament\Resources\routeVariantResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListrouteVariants extends ListRecords
{
    protected static string $resource = routeVariantResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}

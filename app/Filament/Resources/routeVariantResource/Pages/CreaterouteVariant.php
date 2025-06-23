<?php

namespace App\Filament\Resources\routeVariantResource\Pages;

use App\Filament\Resources\routeVariantResource;
use Filament\Resources\Pages\CreateRecord;

class CreaterouteVariant extends CreateRecord
{
    protected static string $resource = routeVariantResource::class;

    protected function getHeaderActions(): array
    {
        return [

        ];
    }
}

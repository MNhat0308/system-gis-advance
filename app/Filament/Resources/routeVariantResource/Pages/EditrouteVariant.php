<?php

namespace App\Filament\Resources\routeVariantResource\Pages;

use App\Filament\Resources\routeVariantResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Resources\Pages\EditRecord;

class EditrouteVariant extends EditRecord
{
    protected static string $resource = routeVariantResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
            ForceDeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}

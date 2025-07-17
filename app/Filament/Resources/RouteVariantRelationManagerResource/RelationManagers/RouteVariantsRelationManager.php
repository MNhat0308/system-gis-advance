<?php

namespace App\Filament\Resources\RouteVariantRelationManagerResource\RelationManagers;

use App\Models\RouteVariant;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Actions\Action;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class RouteVariantsRelationManager extends RelationManager
{
    protected static string $relationship = 'routeVariants';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Route Variant Details')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('route_id')
                                    ->default(fn($livewire) => $livewire->getOwnerRecord()->id)
                                    ->disabled()
                                    ->dehydrated()
                                    ->label('Route ID'),

                                Toggle::make('is_outbound') 
                                ->label('Direction: Luợt đi / Luợt về')
                                    ->onColor('success')
                                    ->offColor('primary')
                                    ->onIcon('heroicon-m-arrow-right')
                                    ->offIcon('heroicon-m-arrow-left')
                                    ->reactive()
                                    ->afterStateUpdated(function (callable $set, $state) {
                                        $set('name', $state ? 'Luợt đi' : 'Luợt về');
                                    }),

                                Select::make('name')
                                    ->label('Variant Name')
                                    ->options([
                                        'Luợt đi' => 'Luợt đi',
                                        'Luợt về' => 'Luợt về',
                                    ])
                                    ->disabled()
                                    ->reactive()
                                    ->default('Luợt về'),

                                TextInput::make('start_stop')
                                    ->required()
                                    ->label('Start Stop'),

                                TextInput::make('end_stop')
                                    ->required()
                                    ->label('End Stop'),

                                TextInput::make('distance')
                                    ->numeric()
                                    ->required()
                                    ->label('Distance (km)'),
                            ]),
                    ])
                    ->columns(1),

                Section::make('Metadata')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Placeholder::make('created_at')
                                    ->label('Created Date')
                                    ->content(fn(?RouteVariant $record): string => $record?->created_at?->diffForHumans() ?? '-'),

                                Placeholder::make('updated_at')
                                    ->label('Last Modified Date')
                                    ->content(fn(?RouteVariant $record): string => $record?->updated_at?->diffForHumans() ?? '-'),
                            ]),
                    ])
                    ->columns(1)
                    ->collapsible(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('routeVariants')
            ->columns([
                IconColumn::make('is_outbound')->label('Outbound')
                    ->boolean()
                    ->trueIcon('heroicon-o-arrow-up-right')
                    ->falseIcon('heroicon-o-arrow-down-left'),

                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),


                TextColumn::make('start_stop'),

                TextColumn::make('end_stop'),

                TextColumn::make('distance')
                    ->label('Distance')
                    ->formatStateUsing(fn($state) => number_format($state, 1) . ' km'),
            ])
            ->filters([
                TrashedFilter::make(),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Action::make('View on Map')
                    ->icon('heroicon-o-map')
                    ->label('View on Map')
                    ->url(fn(RouteVariant $record) => $this->generateGeoJsonIoUrl($record))
                    ->openUrlInNewTab()
                    ->visible(fn(RouteVariant $record) => !is_null($record->path_line))
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    private function generateGeoJsonIoUrl(\App\Models\RouteVariant $record): string
    {
        $geojson = $record->geojson;

        if (!$geojson || empty($geojson->coordinates)) {
            return '#';
        }

        $wrappedGeoJson = [
            'type' => 'FeatureCollection',
            'features' => [
                [
                    'type' => 'Feature',
                    'geometry' => $geojson,
                    'properties' => [
                        "stroke" => "#e41111",
                        "stroke-width" => 4,
                        "stroke-opacity" => 1
                    ],
                ],
            ],
        ];

        return 'https://geojson.io/#data=data:application/json,' . rawurlencode(json_encode($wrappedGeoJson));
    }
}

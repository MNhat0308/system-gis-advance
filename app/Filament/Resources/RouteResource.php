<?php

namespace App\Filament\Resources;

use App\Enums\BusType;
use App\Filament\Exports\RouteExporter;
use App\Filament\Resources\RouteResource\Pages;
use App\Filament\Resources\RouteResource\RelationManagers\ReviewsRelationManager;
use App\Filament\Resources\RouteVariantRelationManagerResource\RelationManagers\RouteVariantsRelationManager;
use App\Models\Route;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ExportBulkAction;
use Filament\Tables\Actions\ForceDeleteAction;
use Filament\Tables\Actions\ForceDeleteBulkAction;
use Filament\Tables\Actions\RestoreAction;
use Filament\Tables\Actions\RestoreBulkAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class RouteResource extends Resource
{
    protected static ?string $model = Route::class;

    protected static ?string $slug = 'routes';

    protected static ?string $navigationIcon = 'heroicon-o-map';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Route Details')
                    ->description('Provide basic information for the route')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('name')
                                ->label('Route Name')
                                ->required(),

                            TextInput::make('code')
                                ->label('Route Code')
                                ->unique('routes', 'code', ignoreRecord: true)
                                ->required(),
                        ]),

                        Textarea::make('description')
                            ->label('Description')
                            ->columnSpanFull(),
                    ])
                    ->columns(1)
                    ->collapsible(),

                Section::make('Status')
                    ->schema([
                        Select::make('type')
                            ->label('Type')
                            ->options([
                                BusType::BUS->value => 'BUS',
                            ])
                            ->required()
                            ->native(false),
                        Checkbox::make('is_active')
                            ->label('Active'),
                    ])
                    ->columns(1),

                Section::make('Metadata')
                    ->schema([
                        Placeholder::make('created_at')
                            ->label('Created Date')
                            ->content(fn(?Route $record): string => $record?->created_at?->diffForHumans() ?? '-'),

                        Placeholder::make('updated_at')
                            ->label('Last Modified Date')
                            ->content(fn(?Route $record): string => $record?->updated_at?->diffForHumans() ?? '-'),
                    ])
                    ->columns(2)
                    ->disabled()
                    ->collapsed(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('code')->searchable()->sortable(),

                TextColumn::make('description'),

                TextColumn::make('type')->color('primary'),

                IconColumn::make('is_active')->boolean()
                    ->label('Active'),

            ])
            ->filters([
                TrashedFilter::make(),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
                RestoreAction::make(),
                ForceDeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    ExportBulkAction::make()->exporter(RouteExporter::class)->fileName(fn() => 'routes_export_' . now()->format('Y-m-d_H-i-s') . '.csv'),
                    DeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListRoutes::route('/'),
            'create' => Pages\CreateRoute::route('/create'),
            'edit' => Pages\EditRoute::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['name'];
    }

    public static function getRelations(): array
    {
        return [
            RouteVariantsRelationManager::class,
            ReviewsRelationManager::class,
        ];
    }
}

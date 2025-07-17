<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ReviewResource\Pages;
use App\Models\Review;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ForceDeleteAction;
use Filament\Tables\Actions\ForceDeleteBulkAction;
use Filament\Tables\Actions\RestoreAction;
use Filament\Tables\Actions\RestoreBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ReviewResource extends Resource
{
    protected static ?string $model = Review::class;

    protected static ?string $slug = 'reviews';

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-ellipsis';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('Review Details')
                ->schema([
                    Grid::make(2)
                        ->schema([
                            Select::make('user_id')
                                ->label('User')
                                ->relationship('user', 'name') // requires relation in model
                                ->searchable()
                                ->required(),

                            Select::make('route_id')
                                ->label('Route')
                                ->relationship('route', 'name')
                                ->getOptionLabelFromRecordUsing(fn ($record) => "{$record->name} _ {$record->code}")
                                ->searchable()
                                ->required(),
                        ]),

                    Select::make('rating')
                        ->label('Rating')
                        ->required()
                        ->options([
                            1 => '⭐☆☆☆☆',
                            2 => '⭐⭐☆☆☆',
                            3 => '⭐⭐⭐☆☆',
                            4 => '⭐⭐⭐⭐☆',
                            5 => '⭐⭐⭐⭐⭐',
                        ]),

                    Textarea::make('comment')
                        ->label('Comment')
                        ->rows(4)
                        ->maxLength(500)
                        ->nullable(),
                ]),

            Section::make('Metadata')
                ->collapsed()
                ->schema([
                    Grid::make(2)
                        ->schema([
                            Placeholder::make('created_at')
                                ->label('Created')
                                ->content(fn(?Review $record): string => $record?->created_at?->diffForHumans() ?? '-'),

                            Placeholder::make('updated_at')
                                ->label('Last Modified')
                                ->content(fn(?Review $record): string => $record?->updated_at?->diffForHumans() ?? '-'),
                        ]),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')->label('User name')->sortable(),
                TextColumn::make('route.name')->label('Route name')->sortable(),
                TextColumn::make('rating')
                    ->label('Rating')
                    ->html()
                    ->formatStateUsing(function ($state) {
                        return str_repeat('⭐', (int)$state);
                    }),
                TextColumn::make('comment')->limit(50),
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
                    DeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListReviews::route('/'),
            'create' => Pages\CreateReview::route('/create'),
//            'edit' => Pages\EditReview::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->withoutGlobalScopes([
            SoftDeletingScope::class,
        ]);
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['comment'];
    }
}

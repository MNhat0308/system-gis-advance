<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\Page;

class Settings extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-cog';
    protected static string $view = 'filament.pages.settings';

    public ?array $formData = [];

    public function mount(): void
    {
        $this->formData = Setting::all()->pluck('value', 'key')->toArray();
    }

    public function submit(): void
    {
        foreach ($this->formData as $key => $value) {
            $setting = Setting::where('key', $key)->first();
            if ($setting->type === 'tags' || $setting->type === 'json') {
                $value = json_encode($value);
            }
            $setting->update(['value' => $value]);
        }

        $this->notify('success', 'Settings updated.');
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema($this->getDynamicFields())
            ->statePath('formData');
    }

    protected function getDynamicFields(): array
    {
        return Setting::all()->map(function ($setting) {
            $field = match ($setting->type) {
                'boolean' => Forms\Components\Toggle::make($setting->key),
                'number' => Forms\Components\TextInput::make($setting->key)->numeric(),
                'json' => Forms\Components\Textarea::make($setting->key)->rows(3),
                'tags' => Forms\Components\TagsInput::make($setting->key),
                default => Forms\Components\TextInput::make($setting->key),
            };

            return $field->label($setting->label);
        })->toArray();
    }
}

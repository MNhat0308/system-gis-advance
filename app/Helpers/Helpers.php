<?php

namespace App\Helpers;

use App\Models\Setting;

function setting(string $key, $default = null)
{
    $value = Setting::where('key', $key)->value('value');

    if (is_null($value)) return $default;

    if (str_starts_with($value, '[') || str_starts_with($value, '{')) {
        return json_decode($value, true);
    }

    return $value;
}

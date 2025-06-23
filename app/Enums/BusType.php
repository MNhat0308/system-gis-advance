<?php

namespace App\Enums;

enum BusType:string
{
    case BUS = 'BUS';
    case WAITING = 'WAITING';

    // Optional helper
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

<?php

namespace App\Helpers;


class PolylineHelper
{
    public static function encode(array $points): string
    {
        $result = '';
        $prevLat = 0;
        $prevLng = 0;

        foreach ($points as [$lat, $lng]) {
            $lat = (int)round($lat * 1e5);
            $lng = (int)round($lng * 1e5);

            $result .= self::encodeDiff($lat - $prevLat);
            $result .= self::encodeDiff($lng - $prevLng);

            $prevLat = $lat;
            $prevLng = $lng;
        }

        return $result;
    }

    private static function encodeDiff(int $value): string
    {
        $value <<= 1;
        if ($value < 0) {
            $value = ~$value;
        }

        $encoded = '';
        while ($value >= 0x20) {
            $encoded .= chr((0x20 | ($value & 0x1F)) + 63);
            $value >>= 5;
        }
        $encoded .= chr($value + 63);
        return $encoded;
    }

    public static function decode(string $polyline): array
    {
        $index = 0;
        $lat = 0;
        $lng = 0;
        $coordinates = [];
        $length = strlen($polyline);

        while ($index < $length) {
            $lat += self::decodeDiff($polyline, $index);
            $lng += self::decodeDiff($polyline, $index);
            $coordinates[] = [$lat / 1e5, $lng / 1e5];
        }

        return $coordinates;
    }

    private static function decodeDiff(string $polyline, int &$index): int
    {
        $result = 0;
        $shift = 0;

        while (true) {
            $b = ord($polyline[$index++]) - 63;
            $result |= ($b & 0x1F) << $shift;
            $shift += 5;

            if ($b < 0x20) break;
        }

        return ($result & 1) ? ~($result >> 1) : ($result >> 1);
    }
}

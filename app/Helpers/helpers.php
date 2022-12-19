<?php

use Illuminate\Support\Facades\Storage;

if (! function_exists('parseInt')) {
    function parseInt($string): int
    {
        return preg_replace('/[^0-9]/', '', $string);
    }
}

if (! function_exists('validateDefaultPhoto')) {
    function validateDefaultPhoto($photoName): bool
    {
        // handle if it's trainer
        $ext = '.jpg';
        if (str_contains($photoName, 'trainers/')) {
            $ext = '.png';
        }

        // handle if it's profile.
        if (str_contains($photoName, 'profiles/')) {
            $preservedUserPhoto = [];

            for ($i = 1; $i <= 6; $i++) {
                $preservedUserPhoto[] = "default$i.jpg";
            }

            return in_array(explode('/', $photoName)[1], $preservedUserPhoto);
        }

        // rest.
        return explode('/', $photoName)[1] !== "default$ext";
    }
}

if (! function_exists('autoRemovePhoto')) {
    function autoRemovePhoto($photoName): void
    {
        if (validateDefaultPhoto($photoName)) {
            Storage::delete('images/'.$photoName);
        }
    }
}

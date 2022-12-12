<?php

if (! function_exists('parseInt')) {
    function parseInt($string)
    {
        return preg_replace('/[^0-9]/', '', $string);
    }
}

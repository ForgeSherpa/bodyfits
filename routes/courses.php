<?php

use App\Http\Controllers\CoursesController;
use Illuminate\Support\Facades\Route;

Route::prefix('courses')->controller(CoursesController::class)->as('courses.')->group(function () {
    Route::get('/', 'index')->name('index');
});

<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FeedbackController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->as('admin.')->middleware('isAdmin')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::put('dashboard', [DashboardController::class, 'updateProfile']);
    Route::prefix('feedback')->as('feedback.')->group(function () {
        Route::get('/', [FeedbackController::class, 'index'])->name('index');
    });
});

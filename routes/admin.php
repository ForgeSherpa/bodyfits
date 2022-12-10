<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FeedbackController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->as('admin.')->middleware(['auth', 'isAdmin'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::put('dashboard', [DashboardController::class, 'updateProfile']);
    Route::prefix('feedback')->as('feedback.')->controller(FeedbackController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/{feedback}', 'detail')->name('detail');
        Route::put('/{feedback}', 'markAsRead')->name('mark');
        Route::delete('/{feedback}', 'delete')->name('delete');
    });
});

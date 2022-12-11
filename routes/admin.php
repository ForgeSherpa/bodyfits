<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FeedbackController;
use App\Http\Controllers\Admin\TrainerController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\CoursesController;
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

    Route::resource('users', UserController::class)->names('users');
    Route::resource('trainers', TrainerController::class)->names('trainers')
        ->parameter('trainers', 'trainers');
    Route::resource('categories', CategoryController::class)->names('categories')
        ->except('show')
        ->parameter('categories', 'categories');
    Route::resource('courses', CoursesController::class)->names('courses')
        ->parameter('courses', 'courses');
});

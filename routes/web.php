<?php

use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/img/{path}', [ImageController::class, 'show'])->name('image')->where('path', '.*');

require __DIR__.'/courses.php';

Route::get('/faq', fn () => Inertia::render('FAQ'))->name('faq');

Route::middleware('auth')->group(function () {
    Route::get('/feedback', [FeedbackController::class, 'index'])->name('feedback');
    Route::post('/feedback', [FeedbackController::class, 'sendFeedback'])->middleware('throttle:3,1');
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'));

    Route::prefix('/profile')->controller(UserController::class)->group(function () {
        Route::get('/', 'index')->name('profile');
        Route::put('/', 'updateProfile');
        Route::put('/changePassword', 'changePassword')->name('profile.changePassword');
        Route::delete('/delete', 'deleteAccount')->name('profile.deleteAccount');
    });
});

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';

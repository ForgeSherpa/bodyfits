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

require __DIR__ . '/courses.php';

Route::get('/faq', fn () => Inertia::render('FAQ'))->name('faq');

Route::middleware('auth')->group(function () {
    Route::get('/feedback', [FeedbackController::class, 'index'])->name('feedback');
    Route::post('/feedback', [FeedbackController::class, 'sendFeedback']);
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'));
    Route::get('/profiles', [UserController::class, 'index'])->name('profile');
    Route::put('/profiles', [UserController::class, 'updateProfile']);
});

require __DIR__ . '/auth.php';

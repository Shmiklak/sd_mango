<?php

use App\Http\Controllers\oAuth\OsuAuthController;
use Illuminate\Foundation\Application;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => false,
        'canRegister' => false,
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('osu_auth', [OsuAuthController::class, 'redirectToProvider'])->name('osu_login');
Route::get('osu_login', [OsuAuthController::class, 'handleProviderCallback']);
Route::get('logout', [OsuAuthController::class, 'handleLogout'])->name('logout');

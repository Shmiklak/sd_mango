<?php

use App\Http\Controllers\oAuth\OsuAuthController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;

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
Route::get('/team', [HomeController::class, 'team'])->name('team');
Route::get('/queue', [HomeController::class, 'queue'])->name('queue');
Route::get('/send-request', [HomeController::class, 'send_request'])->name('send_request');
Route::post('/send-request', [HomeController::class, 'send_request_post'])->name('send_request.post');

Route::get('osu_auth', [OsuAuthController::class, 'redirectToProvider'])->name('osu_login');
Route::get('osu_login', [OsuAuthController::class, 'handleProviderCallback']);
Route::get('logout', [OsuAuthController::class, 'handleLogout'])->name('logout');

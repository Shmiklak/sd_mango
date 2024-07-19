<?php

use App\Http\Controllers\oAuth\OsuAuthController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NominatorController;
use App\Http\Controllers\AdminController;
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
Route::get('/my_requests', [HomeController::class, 'my_requests'])->name('my_requests');
Route::get('/send-request', [HomeController::class, 'send_request'])->name('send_request');
Route::post('/send-request', [HomeController::class, 'send_request_post'])->name('send_request.post');
Route::get('/queue/request/{id}', [HomeController::class, 'queue_request'])->name('queue_request');

Route::middleware('elevated_access')->group(function () {
    Route::get('/my_responses', [NominatorController::class, 'my_responses'])->name('my_responses');
    Route::post('/update-response', [NominatorController::class, 'update_response'])->name('update_response');
    Route::post('/rank-beatmap', [NominatorController::class, 'rank_beatmap'])->name('rank_beatmap');
});

Route::middleware('admin')->group(function () {
   Route::get('/edit-team', [AdminController::class, 'edit_team'])->name('edit_team');
});

Route::get('osu_auth', [OsuAuthController::class, 'redirectToProvider'])->name('osu_login');
Route::get('osu_login', [OsuAuthController::class, 'handleProviderCallback']);
Route::get('logout', [OsuAuthController::class, 'handleLogout'])->name('logout');


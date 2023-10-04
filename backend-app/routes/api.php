<?php

use App\Http\Controllers\NetworkController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */

Route::prefix('v1')->middleware(['cors'])->group(function () {
    Route::name('speed-test.')->group(function () {
        Route::get('/hello', [NetworkController::class, 'Hello']);
        Route::get('/servers', [NetworkController::class, 'Servers']);
        Route::get('/ping', [NetworkController::class, 'Ping']);
        Route::get('/download-speed', [NetworkController::class, 'DownloadSpeed']);
        Route::get('/ip-info', [NetworkController::class, 'IpInfo']);
        Route::get('/upload-speed', [NetworkController::class, 'UploadSpeed']);
    });
});

Route::prefix('v1')->middleware(['cors-ping'])->group(function () {
    Route::name('speed-test.')->group(function () {
        Route::get('/ping', [NetworkController::class, 'Ping']);
    });
});

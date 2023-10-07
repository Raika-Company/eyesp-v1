<?php

use App\Http\Controllers\ClientController;
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
        Route::get('/get-ip', [NetworkController::class, 'getClientIp']);
        Route::post('/set-ip-info', [NetworkController::class, 'setIpInfo']);
        Route::get('/servers', [NetworkController::class, 'servers']);
        Route::get('/ping', [NetworkController::class, 'ping']);
        Route::get('/download-speed', [NetworkController::class, 'downloadSpeed']);
        Route::get('/upload-speed', [NetworkController::class, 'uploadSpeed']);

        Route::prefix('dashboard')->group(function () {
            Route::get('/isp-metrics/{city?}', [NetworkController::class, 'ispMetrics']);
        });

        Route::prefix('client')->group(function () {
            Route::post('/report', [ClientController::class, 'report']);
        });
    });
});

Route::prefix('v1')->middleware(['cors-ping'])->group(function () {
    Route::name('speed-test.')->group(function () {
        Route::get('/ping', [NetworkController::class, 'Ping']);
    });
});

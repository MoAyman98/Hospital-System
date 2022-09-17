<?php

use App\Http\Controllers\SectionController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/specilizations',[SectionController::class, 'GetSpecilizations']);

Route::post('/register',[UserController::class, 'Register']);

Route::post('/login',[UserController::class, 'Login']);

Route::get('/appointments/{id}',[SectionController::class, 'GetAppointments']);

Route::post('/bookapp',[SectionController::class, 'BookAppointment']);

Route::get('/user',[UserController::class, 'GetUser']);





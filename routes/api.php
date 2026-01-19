<?php
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\JokesController;

//Protected Routes
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('jokes', [JokesController::class, 'index']);
});

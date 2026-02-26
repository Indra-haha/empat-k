<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegistrasiController;
use App\Http\Controllers\auth\LoginController;

Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'lihatFormLogin']);
    Route::post('/action/login', [LoginController::class, 'isiFormLogin']);

    Route::get('/register', [RegistrasiController::class, 'lihatFormPendaftaran'])->name('register');
    Route::post('/action/register', [RegistrasiController::class, 'isiFormPendaftaran']);
});
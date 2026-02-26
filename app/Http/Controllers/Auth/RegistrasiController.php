<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Inertia\Inertia;

class RegistrasiController extends Controller
{
    public function lihatFormPendaftaran()
    {
        return Inertia::render('Auth/Register'); // React component
    }

    public function isiFormPendaftaran(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'no_hp' => 'required|string|max:15',
            'username' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:3',
        ]);

        $user = User::create([
            'name' => $request->name,
            'no_hp' => $request->no_hp,
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        return Inertia::render('Auth/Login')->with('success', 'Akun terdaftar, silakan login.');
    }
}
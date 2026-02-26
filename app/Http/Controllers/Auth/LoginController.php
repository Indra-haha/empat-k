<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function lihatFormLogin()
    {
        return Inertia::render('Auth/Login'); // React component
    }

    public function isiFormLogin(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($request->only('username', 'password'))) {
            $request->session()->regenerate();
            return redirect()->intended('Home')->with('success', 'Selamat datang!');
        }

        return back()->withErrors(['username' => 'Username atau password salah.']);
    }
}
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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

        $user = User::where('username', $request->username)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $request->session()->put('user_id', $user->id);
            $request->session()->put('role', $user->role);
            return redirect('/dashboard')->with('success', 'Login berhasil.');
        }

        return back()->with('error', 'Username atau password salah.');
    }
}

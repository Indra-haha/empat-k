<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        /* default page ketika dikunjungi pertama kali */
        if (in_array(Auth::user()->role, ['pelanggan', 'cs'])) {
            return redirect()->intended('/products'); 
        } else if (Auth::user()->role === 'desainer') {
            return redirect()->intended('/requests');
        } else if (Auth::user()->role === 'accounting') {
            return redirect()->intended('/billings');
        } else if (Auth::user()->role === 'kp') {
            return redirect()->intended('/work-orders');
        } else {
            return redirect()->intended('/dashboard');
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}

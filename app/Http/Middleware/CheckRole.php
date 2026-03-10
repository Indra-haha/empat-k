<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        // User must be logged in
        if (!Auth::check()) {
            return redirect('/login');
        }

        // Check user role
        if (!in_array(Auth::user()->role, $roles)) {
            return redirect()->back();
        }

        return $next($request);
    }
}
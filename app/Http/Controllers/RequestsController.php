<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;

class RequestsController extends BaseController
{
    public function index()
    {
        return Inertia::render('Requests');
    }
}

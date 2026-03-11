<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Request;;;

class RequestsController extends BaseController
{
      public function index() {
        $this->authorizeAction('viewAny');
        $requests = Request::all();
        return inertia('requests', compact('requests'));
    }
}

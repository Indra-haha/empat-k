<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
     protected function authorizeAction($action, $model = null)  // ← kasih default null
    {
        if ($model) {
            $this->authorize($action, $model);
        } else {
            $this->authorize($action);
        }
    }
}
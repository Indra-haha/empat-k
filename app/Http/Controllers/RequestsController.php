<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
use App\Models\CustomRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RequestsController extends BaseController
{
    public function index()
    {
        $this->authorizeAction('viewAny');
        $requests = CustomRequest::all();
        return inertia('requests', compact('requests'));
    }

    public function store(Request $request)
    {
        $this->authorizeAction('create');
        $data = $request->validate([
            'product_id' => 'required',
            'description' => 'required|array',
        ]);

        CustomRequest::create([
            'product_id' => $data['product_id'],
            'user_id' => Auth::user()->user_id,
            'description' => $data['description'],
        ]);

        return redirect()->route('products.index')->with('success', 'Custom request created successfully.');
    }
}

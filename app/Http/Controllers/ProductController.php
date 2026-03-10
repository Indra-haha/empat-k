<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Product;

class ProductController extends BaseController
{
    protected $modelClass = Product::class;

    public function index() {
        $this->authorizeAction('viewAny');
        $products = Product::all();
        return inertia('Products', compact('products'));
    }

    public function create() {
        $this->authorizeAction('create');
        return inertia('Products/Create');
    }

    public function store(Request $request) {
        $this->authorizeAction('create');
        Product::create($request->all());
        return redirect()->route('products.index');
    }
}
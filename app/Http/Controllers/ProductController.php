<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Product;

class ProductController extends BaseController
{
    protected $modelClass = Product::class;

    /* CS lihat produk */
    public function index()
    {
        $this->authorizeAction('viewAny');
        $products = Product::all();
        $role = auth()->user()->role;

        return inertia("$role/Products", compact('products'));
    }

    /* Pelanggan lihat produk */
    public function show()
    {
        $this->authorizeAction('view');
        return inertia('Customers/Products', compact('products'));
    }

    public function update()
    {
        $this->authorizeAction('update');
        return inertia('CS/Products/update');
    }

    public function store(Request $request)
    {
        $this->authorizeAction('create');
        Product::create($request->all());
        return redirect()->route('products.index');
    }
}
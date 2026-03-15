<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
class ProductController extends BaseController
{
    protected $modelClass = Product::class;

    /* CS lihat produk */
    public function index()
    {
        $this->authorizeAction('viewAny');
        $products = Product::with('category')->get();
        $role = auth()->user()->role;

        return inertia("$role/ProductPage/Products", compact('products'));
    }

    /* Pelanggan lihat produk */
    public function show($id)
    {
        $this->authorizeAction('view');
        $product = Product::with('category')->findOrFail($id);
        $role = auth()->user()->role;
        return inertia("$role/ProductPage/ProductsShow", [
            'product' => $product
        ]);
    }
    public function instantBuying($id)
    {
        $this->authorizeAction('view');
        $product = Product::with('category')->findOrFail($id);
        $requests = \App\Models\Request::where('user_id', auth()->id())
            ->where('product_id', $id)
            ->where('status', 'finished')
            ->latest('updated_at')
            ->first();
        $id = Auth::user()->user_id;

        return inertia('pelanggan/ProductPage/FormBuying', [
            'product' => $product,
            'requests' => $requests,
            'user' => $id,
        ]);
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
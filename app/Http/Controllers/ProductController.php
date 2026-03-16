<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
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

        $data = [
            'products' => $products,
        ];

        if ($role === 'cs') {
            $data['categories'] = Category::select('name', 'category_id as id')->get();
        }

        return Inertia::render("$role/ProductPage/ProductList", $data);
    }

    /* Pelanggan lihat produk */
    public function show($id)
    {
        $this->authorizeAction('view');
        $product = Product::with('category')->findOrFail($id);
        $role = auth()->user()->role;
        return Inertia::render("$role/ProductPage/ProductShow", [
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

        return Inertia::render('pelanggan/ProductPage/FormBuying', [
            'product' => $product,
            'requests' => $requests,
            'user' => $id,
        ]);
    }
    public function update()
    {
        $this->authorizeAction('update');
        return Inertia::render('CS/Products/update');
    }

    public function store(Request $request)
    {
        $this->authorizeAction('create');
        Product::create($request->all());
        return redirect()->route('products.index');
    }
}
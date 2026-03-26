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

    /* CS & pelanggan lihat produk */
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

    /* Pelanggan lihat detail produk */
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

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,category_id',
            'url_img' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'description' => 'nullable|string',
        ]);

        if ($request->hasFile('url_img')) {
            $path = $request->file('url_img')->store('products', 'public');

            // simpan path saja
            $validatedData['url_img'] = $path;
        }

        Product::create($validatedData);
        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function custom($id)
    {
        $this->authorizeAction('view');
        $product = Product::with('category')->findOrFail($id);
        return Inertia::render('pelanggan/RequestPage/FormCustom', [
            'product' => $product
        ]);
    }
}
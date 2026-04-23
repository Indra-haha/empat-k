<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Product;
use App\Models\CustomRequest;
use Illuminate\Support\Facades\Auth;
class ProductController extends BaseController
{
    /* CS & pelanggan lihat produk */
    public function index()
    {
        $this->authorizeAction('view', Product::class);
        $products = Product::with(['category:category_id,name'])->get()
            ->makeHidden(['category_id'])
            ->groupBy(function ($product) {
                return $product->category?->name;
            })
            ->map(function ($items) {
                return $items->map(function ($product) {
                    return [
                        'product_id' => $product->product_id,
                        'name' => $product->name,
                        'price' => $product->price,
                        'url_img' => $product->url_img,
                        'description' => $product->description,
                    ];
                });
            });

        $role = Auth::user()->role;
        return Inertia::render("$role/ProductPage/ProductList", [
            'products' => $products
        ]);
    }

    /* Pelanggan lihat detail produk */
    public function show($id)
    {
        $this->authorizeAction('view', Product::class);
        $product = Product::with('category:category_id,name')->findOrFail($id);
        $product = [
            'product_id' => $product->product_id,
            'name' => $product->name,
            'price' => $product->price,
            'url_img' => $product->url_img,
            'description' => $product->description,
            'category' => $product->category->name,
        ];
        $role = Auth::user()->role;
        return Inertia::render("$role/ProductPage/ProductShow", [
            'product' => $product
        ]);
    }


    public function instantBuying($id)
    {
        $this->authorizeAction('view', Product::class);
        $product = Product::with('category')->findOrFail($id);
        $requests = CustomRequest::where('user_id', Auth::user()->user_id)
            ->where('product_id', $id)
            ->where('status', 'finished')
            ->latest('updated_at')
            ->first();
        $id = Auth::user()->user_id;
        $role = Auth::user()->role;
        return Inertia::render("$role/ProductPage/FormBuying", [
            'product' => $product,
            'requests' => $requests,
            'user' => $id,
        ]);
    }
    public function update($id)
    {
        $this->authorizeAction('update', Product::class);
        $product = Product::findOrFail($id);
        $role = Auth::user()->role;
        return Inertia::render("$role/Products/update", [
            'product' => $product
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizeAction('create', Product::class);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,category_id',
            'url_img' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'description' => 'nullable|string',
        ]);

        if ($request->hasFile('url_img')) {
            $path = $request->file('url_img')->store('uploads/products', 'public');

            // simpan path saja
            $validatedData['url_img'] = $path;
        }

        Product::create($validatedData);
        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function custom($id)
    {
        $this->authorizeAction('view', Product::class);
        $product = Product::with('category')->findOrFail($id);
        return Inertia::render('pelanggan/RequestPage/FormCustom', [
            'product' => $product
        ]);
    }
}
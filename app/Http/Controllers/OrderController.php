<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
class OrderController extends Controller
{
    public function index()
    {
        // Logic untuk menampilkan daftar pesanan
    }

    public function create($id): Response
    {
        return Inertia::render(`pelanggan/product/${id}`);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required',
            'request_id' => 'nullable',
            'product_id' => 'required',
            'quantity' => 'required',
            'price' => 'required',
            'total_price' => 'required'
        ]);

        Order::create($request->all());
        return redirect()->route('orders.show')->with('success', 'Order created successfully.');
    }

    public function show()
    {
        $user = Auth::user();
        $role = $user->role;
        $role === 'pelanggan' ?
            $orders = Order::with('product', 'user')
                ->select('orders.created_at', 'orders.quantity', 'orders.total_price', 'orders.status', 'product_id', 'user_id')
                ->get() : 
            $orders = Order::with('product')
                ->select('orders.created_at', 'orders.quantity', 'orders.total_price', 'orders.status', 'product_id', 'user_id')
                ->get();

        return Inertia::render("${role}/OrderPage/Page", [
            'orders' => $orders
        ]);

    }

}

<?php

namespace App\Http\Controllers;

use App\Models\OrderStatusHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
class OrderController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $role = $user->role;
        $role === 'pelanggan' ?
            $orders = Order::with('product', 'latestStatus')
                ->get()
                ->where('user_id', $user->user_id)
                ->map(function ($order) {
                    return [
                        'no' => $order->order_id,
                        'name' => $order->product->name,
                        'url' => $order->product->url_img,
                        'quantity' => $order->quantity,
                        'ordered_by' => Carbon::parse($order->created_at)
                            ->locale('id')
                            ->translatedFormat('d F Y'),
                        'status' => $order->latestStatus->status,
                    ];
                })

            :
            $orders = Order::with('product', 'request', 'latestStatus', 'user')
                ->get()
                ->map(function ($order) {
                    return [
                        'no' => $order->order_id,
                        'name' => $order->product->name,
                        'user' => $order->user->name,
                        'request' => ($order->request_id) ? $order->request_id : null,
                        'phone' => $order->user->no_hp,
                        'url_img_product' => $order->product->url_img,
                        'url_img_request' => ($order->request && $order->request->status === 'finished') ? $order->request->upload_img : null,
                        'ordered_by' => Carbon::parse($order->created_at)
                            ->locale('id')
                            ->translatedFormat('d F Y'),
                        'quantity' => $order->quantity,
                        'price' => $order->product->price,
                        'total_price' => $order->total_price, // rename
                        'status' => $order->latestStatus->status,
                    ];
                });
        return Inertia::render("${role}/OrderPage/OrderList", [
            'orders' => $orders
        ]);

    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required',
            'request_id' => 'nullable',
            'product_id' => 'required',
            'quantity' => 'required',
        ]);

        $price = Product::findOrFail($request->product_id)->price;
        $order = Order::create([
            'user_id' => $request->user_id,
            'request_id' => $request->request_id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'price' => $price,
            'total_price' => $request->quantity * $price
        ]);
        OrderStatusHistory::create([
            'order_id' => $order->order_id,
            'status' => $order->status, // ambil dari orders
            'created_by' => auth()->id(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        return redirect()->route('orders.index')->with('success', 'Order created successfully.');
    }

    public function show($id)
    {
        $order = Order::where('order_id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();
        return Inertia::render('pelanggan/OrderPage/OrderShow', [
            'order' => [
                'no' => $order->order_id,
                'name' => $order->product->name,
                'url' => $order->product->url_img,
                'category' => $order->product->category->name,
                'request' => $order->request_id ? $order->request->fee : null,
                'quantity' => $order->quantity,
                'price' => $order->product->price,
                'total_price' => $order->total_price,
                'ordered_by' => Carbon::parse($order->created_at)
                    ->locale('id')
                    ->translatedFormat('d F Y'),
                'status_histories' => $order->statusHistories->map(function ($status) {
                    return [
                        'status' => $status->status,
                        'updated_at' => Carbon::parse($status->updated_at)
                            ->locale('id')
                            ->translatedFormat('d F Y'),
                    ];
                }),
            ]
        ]);
    }

}

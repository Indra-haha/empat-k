<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
                        'no' => $order->product->product_id,
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
            $orders = Order::with('product', 'latestStatus')
                ->get()
                ->map(function ($order) {
                    return [
                        'quantity' => $order->quantity,
                        'no' => $order->order_id,
                        'url_img' => $order->product->url_img,
                        'ordered_by' => Carbon::parse($order->created_at)
                            ->locale('id')
                            ->translatedFormat('d F Y'),
                        'total_price' => $order->total_price, // rename
                        'status' => $order->latestStatus->status,
                    ];
                });
        return Inertia::render("${role}/OrderPage/OrderList", [
            'orders' => $orders
        ]);

    }

    // public function create($id): Response
    // {
    //     return Inertia::render(`pelanggan/product/${id}`);
    // }

    public function store(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required',
            'request_id' => 'nullable',
            'product_id' => 'required',
            'quantity' => 'required',
        ]);

        DB::transaction(function () use ($request) {
            $price = DB::table('products')
                ->where('product_id', $request->product_id)
                ->value('price');

            $order = Order::create([
                'user_id' => $request->user_id,
                'request_id' => $request->request_id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'price' => $price,
                'total_price' => $request->quantity * $price
            ]);

            DB::table('order_status_histories')->insert([
                'order_id' => $order->order_id,
                'status' => $order->status, // ambil dari orders
                'created_by' => auth()->id(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });
        return redirect()->route('orders.index')->with('success', 'Order created successfully.');
    }

    public function show($id)
    {
        // return Inertia::render('pelanggan/OrderPage/OrderShow', [
        //     'order' => "Order masuk show dengan id $id"
        // ]);
        $this->authorizeAction('view');
        $order = Order::with('statusHistories')->where('product_id', $id)
        ->where('user_id', auth()->id())
        ->firstOrFail()                                                                                              ;
        return Inertia::render('pelanggan/OrderPage/OrderShow', [
            'order' => [
                'no' => $order->product->product_id,
                'name' => $order->product->name,
                'url' => $order->product->url_img,  
                'quantity' => $order->quantity,
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

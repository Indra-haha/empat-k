<?php

namespace App\Http\Controllers;

use App\Models\CustomRequest;
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
        $this->authorizeAction('view', Order::class);
        $user = Auth::user();
        $role = $user->role;

        if ($role === 'pelanggan') {
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
                        'status' => $order->latestStatus?->status ?? 'pending',
                    ];
                });

        } elseif ($role === 'cs') {
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
                        'status' => $order->latestStatus?->status ?? 'pending',
                        'fee' => $order->request->fee ?? "kosong",
                    ];
                });
        } else {
            $ordersRaw = Order::with('latestStatus', 'request', 'invoice', 'product')
                ->whereHas('latestStatus', function ($q) {
                    $q->whereIn('status', ['ordered', 'partial_paid']);
                })
                ->get();
            $groupedOrders = $ordersRaw->groupBy(function ($order) {
                // Ambil invoice terbaru dari koleksi invoices (Many-to-One)
                $latestInvoice = $order->latestInvoiceStatus()->first();

                if (!$latestInvoice) {
                    return 'orders';
                }

                if (empty($latestInvoice->url_img_bukti)) {
                    return 'receipts';
                }

                return 'complete';
            });

            // Map setiap grup menggunakan helper function
            $orders = [
                'orders' => $this->mapForAccountingOrders($groupedOrders->get('orders', collect())),
                'receipts' => $this->mapForAccountingOrders($groupedOrders->get('receipts', collect())),
                'complete'   => $this->mapForAccountingOrders($groupedOrders->get('complete', collect())),
            ];
           
        }
        return Inertia::render("$role/OrderPage/OrderList", [
            'orders' => $orders
        ]);

    }

    private function mapForAccountingOrders($collection)
    {
        return $collection->map(function ($order) {
            // Ambil invoice terbaru karena relasi Many-to-One
            $latestInvoice = $order->latestInvoiceStatus()->first();

            return [
                'no' => $order->order_id,
                'invoice_no' => $latestInvoice?->invoice_number,
                'product_name' => $order->product->name,
                'product_category' => $order->product->category->name ?? '-',
                'url_img_request' => $order->request?->upload_img,
                'custom_fee' => $order->request?->fee,
                'quantity' => $order->quantity,
                'price' => $order->product->price,
                'total_price' => $order->total_price,
                'url_img_tagihan' => $latestInvoice?->url_img_tagihan,
                'update_at' => $order->latestStatus 
                    ? Carbon::parse($order->latestStatus->created_at)->locale('id')->translatedFormat('d F Y')
                    : '-',
                'status' => $order->latestStatus->status ?? 'ordered',
            ];
        })->values(); // Reset keys agar menjadi array murni di JSON
    
    }

    public function store(Request $request)
    {
        $this->authorizeAction('create', Order::class);
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
            'status' => $request->status ?? 'pending',
            'created_by' => auth()->id(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        return redirect()->route('orders.index')->with('success', 'Order created successfully.');
    }

    public function show($id)
    {
        $this->authorizeAction('view', Order::class);
        $order = Order::where('order_id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();
        return Inertia::render('pelanggan/OrderPage/OrderShow', [
            'order' => [
                'no' => $order->order_id,
                'name' => $order->product->name,
                'url' => $order->product->url_img,
                'category' => $order->product->category->name,
                'request' => $order->request_id ? $order->request_id : null,
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

    public function updateStatus($id)
    {
        $this->authorizeAction('update', Order::class);
        sleep(2);
        $order = Order::where('order_id', $id)->firstOrFail();
        $role = Auth::user()->role;
        $currentStatus = $order->latestStatus?->status ?? 'pending';

        /* Apakah ini produk custom? Jika ya, harus 'finished' dulu request-nya. */
        $isCustomAndReady = true;
        if ($order->request_id) {
            $isCustomAndReady = CustomRequest::where('request_id', $order->request_id)
                ->where('status', 'finished')
                ->exists();
        }

        /* Tidak ready (untuk custom), langsung tolak */
        if (!$isCustomAndReady) {
            return redirect()->back()->with('error', 'Permintaan custom belum selesai dikerjakan!');
        }

        /* Ketika cs update status */
        if ($role === 'cs') {
            if ($currentStatus === 'pending') {
                $this->validate(request(), [
                    'fee' => 'required|numeric|min:0',
                ]);
                $newStatus = 'ordered';
            } elseif ($currentStatus === 'paid') {
                $newStatus = 'process';
            }
        } elseif ($role === 'accounting' && $currentStatus === 'ordered') {
            /* Ketika accounting update status */
            $newStatus = 'paid';
        } elseif ($role === 'kp' && $currentStatus === 'process') {
            /* Ketika kp update status */
            $newStatus = 'finished';
        }

        /* Buat history status baru */
        if (isset($newStatus)) {
            OrderStatusHistory::create([
                'order_id' => $id,
                'status' => $newStatus,
                'created_by' => Auth::id(),
            ]);
            return redirect()->back()->with('success', "Status berhasil diperbarui ke {$newStatus}!");
        }

        return redirect()->back()->with('error', 'Anda tidak memiliki akses atau status tidak valid untuk diperbarui.');
    }
}

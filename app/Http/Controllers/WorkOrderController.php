<?php

namespace App\Http\Controllers;
use App\Models\Order;
use App\Models\WorkOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class WorkOrderController extends Controller
{
    public function index()
    {
        $this->authorizeAction('view', WorkOrder::class);
        $role = auth()->user()->role;
        $ordersRaw = Order::with('latestStatus', 'request', 'invoice', 'product')
            ->whereHas('latestStatus', function ($q) {
                $q->whereIn('status', ['partial_paid', 'process', 'checking']);
            })
            ->get();
        $groupedOrders = $ordersRaw->groupBy(function ($order) {
            // Ambil invoice terbaru dari koleksi invoices (Many-to-One)
            $latestStatus = $order->latestStatus()->first()?->status;

            if ($latestStatus === 'partial_paid') {
                return 'none';
            }

            if ($latestStatus === 'process') {
                return 'process';
            }

            return 'checking';
        });

        $workOrders = [
            'none' => $this->mapWorkOrder($groupedOrders->get('none', collect())),
            'process' => $this->mapWorkOrder($groupedOrders->get('process', collect())),
            'checking' => $this->mapWorkOrder($groupedOrders->get('checking', collect())),
        ];

        return Inertia::render("$role/WorkOrderPage/WorkOrderList", [
            'workOrders' => $workOrders,
        ]);
    }

    private function mapWorkOrder($collection)
    {
        return $collection->map(function ($order) {

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
                'status_bukti' => $order->latestInvoiceStatus->status_bukti ?? null,
                'fee' => $order->request->fee ?? null,
            ];
        })->values(); // Reset keys agar menjadi array murni di JSON
    }

    public function showWorkOrder($id)
    {
        $order = WorkOrder::with('product')->findOrFail($id);
        return inertia('WorkOrder/Show', compact('order'));
    }
}
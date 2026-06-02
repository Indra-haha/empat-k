<?php

namespace App\Http\Controllers;
use App\Models\Order;
use App\Models\WorkOrder;
use App\Models\OrderStatusHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Services\CloudinaryService;

class WorkOrderController extends Controller
{
    public function index(CloudinaryService $cloudinary)
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
            'none' => $this->mapWorkOrder($groupedOrders->get('none', collect()), $cloudinary),
            'process' => $this->mapWorkOrder($groupedOrders->get('process', collect()), $cloudinary),
            'checking' => $this->mapWorkOrder($groupedOrders->get('checking', collect()), $cloudinary),
        ];

        return Inertia::render("$role/WorkOrderPage/WorkOrderList", [
            'workOrders' => $workOrders,
        ]);
    }

    private function mapWorkOrder($collection, CloudinaryService $cloudinary)
    {
        return $collection->map(function ($order) use ($cloudinary) {
            $status = $order->latestStatus?->status ?? 'pending';
            $common = [
                'no' => $order->order_id,
                'name' => $order->product->name,
                'user' => $order->user->name,
                'request' => ($order->request_id) ? $order->request_id : null,
                'phone' => $order->user->no_hp,
                'url_img_product' => $order->product->url_img ? $cloudinary->getUrl($order->product->url_img) : null,
                'url_img_request' => ($order->request && $order->request->status === 'finished') ? $cloudinary->getUrl($order->request->upload_img) : null,
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
            if($status === 'process'){
                return array_merge($common, [
                    'ukuran' => $order->workOrder->ukuran,
                    'bahan' => $order->workOrder->bahan,
                    'finishing' => $order->workOrder->finishing,
                    'status_pengerjaan' => $order->workOrder->status_pengerjaan,
                ]);
            }
            return [
                ...$common,
            ];
        })->values(); // Reset keys agar menjadi array murni di JSON
    }

    public function showWorkOrder($id)
    {
        $order = WorkOrder::with('product')->findOrFail($id);
        return inertia('WorkOrder/Show', compact('order'));
    }

    public function store(Request $request)
    {
        $this->authorizeAction('create', WorkOrder::class);
        $validatedData = $request->validate([
            'order_id' => 'required|exists:orders,order_id',
            'ukuran' => 'required|string',
            'bahan' => 'required|string',
            'finishing' => 'required|string',
        ]);

        $validatedData['status_pengerjaan'] = 'process';
        WorkOrder::create($validatedData);
        OrderStatusHistory::create([
            'order_id' => $validatedData['order_id'],
            'status' => 'process',
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('work-orders.index')
            ->with('success', 'Work order berhasil dibuat.');
    }

}
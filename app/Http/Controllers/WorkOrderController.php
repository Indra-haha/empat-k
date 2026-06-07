<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\WorkOrder;
use App\Models\OrderStatusHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Services\CloudinaryService;
use Illuminate\Support\Facades\Auth;

class WorkOrderController extends Controller
{

    public function index(CloudinaryService $cloudinary)
    {
        $this->authorizeAction('view', WorkOrder::class);
        $role = Auth::user()->role;
        $ordersRaw = Order::with('latestStatus', 'request', 'invoice', 'product', 'workOrder')->get();
        $groupedOrders = $ordersRaw->groupBy(function ($order) {
            // Ambil invoice terbaru dari koleksi invoices (Many-to-One)
            $latestStatus = $order->latestStatus()->first()?->status;
            if (!$latestStatus) {
                return 'none';
            }

            if (in_array($latestStatus, ['pending', 'ordered'])) {
                return 'useless';
            }

            if ($latestStatus === 'partial_paid') {
                return 'none';
            }

            if ($latestStatus === 'process') {
                return 'process';
            }
            if ($latestStatus === 'checking') {
                return 'checking';
            }

            if ($latestStatus === 'finished') {
                return 'finished';
            }

            if ($latestStatus === 'rejected') {
                return 'rejected';
            }
            return 'checking';
        });

        $workOrders = [
            'process' => $this->mapWorkOrder($groupedOrders->get('process', collect()), $cloudinary),
            'checking' => $this->mapWorkOrder($groupedOrders->get('checking', collect()), $cloudinary),
            'finished' => $this->mapWorkOrder($groupedOrders->get('finished', collect()), $cloudinary),
            'rejected' => $this->mapWorkOrder($groupedOrders->get('rejected', collect()), $cloudinary),
        ];
        if ($role === 'cs') {
            $workOrders = array_merge([
                'none' => $this->mapWorkOrder($groupedOrders->get('none', collect()), $cloudinary),
            ], $workOrders);
        }

        return Inertia::render("$role/WorkOrderPage/WorkOrderList", [
            'workOrders' => $workOrders,
        ]);
    }

    private function mapWorkOrder($collection, CloudinaryService $cloudinary)
    {

        return $collection->map(function ($order) use ($cloudinary) {
            $status = $order->latestStatus?->status;
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

            if ($status === 'process' || $status === 'checking' || $status === 'finished' || $status === 'rejected') {
                return array_merge($common, [
                    'ukuran' => $order->workOrder->ukuran,
                    'bahan' => $order->workOrder->bahan,
                    'finishing' => $order->workOrder->finishing,
                    'status_pengerjaan' => $order->workOrder->status_pengerjaan,
                    'img_laporan' => $order->workOrder->img_laporan ? $cloudinary->getAuthenticatedImageUrl($order->workOrder->img_laporan) : null,
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

    public function store(Request $request, CloudinaryService $cloudinary)
    {
        $this->authorizeAction('update', WorkOrder::class);
        $role = Auth::user()->role;
        if ($role === 'cs') {
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
                'created_by' => Auth::id(),
            ]);

            return redirect()->route('work-orders.index')
                ->with('success', 'Work order berhasil dibuat.');
        }
        $validatedData = $request->validate([
            'order_id' => 'required|exists:work_orders,wo_id',
            'img_laporan' => 'required|image|max:2048', // Validasi file gambar
        ]);
        $file = $request->file('img_laporan');

        $result = $cloudinary->upload($file->getRealPath(), [
            'folder' => 'laporan',
            'resource_type' => 'image',
            'type' => 'authenticated'
        ]);
        $publicId = $result['public_id'];
        $workOrder = WorkOrder::where('wo_id', $request->order_id)->first();
        $workOrder->update([
            'img_laporan' => $publicId,
            'status_pengerjaan' => 'finished',
        ]);

        OrderStatusHistory::create([
            'order_id' => $workOrder->order_id,
            'status' => 'checking',
            'created_by' => Auth::id(),
        ]);

        return redirect()->route('work-orders.index')
            ->with('success', 'Work order berhasil dibuat.');
    }

    public function reportApproval(Request $request)
    {
        $this->authorizeAction('update', WorkOrder::class);
        $validatedData = $request->validate([
            'id' => 'required|exists:work_orders,wo_id',
            'action' => 'required|in:approved,rejected',
        ]);

        $workOrder = WorkOrder::where('wo_id', $validatedData['id'])->first();
        if (!$workOrder) {
            return redirect()->route('work-orders.index')
                ->with('error', 'Work order tidak ditemukan.');
        }

        $newStatus = ($validatedData['action'] === 'approved') ? 'finished' : 'rejected';
        $workOrder->update(['status_pengerjaan' => $newStatus]);

        OrderStatusHistory::create([
            'order_id' => $workOrder->order_id,
            'status' => $newStatus,
            'created_by' => Auth::id(),
        ]);

        return redirect()->route('work-orders.index')
            ->with('success', 'Laporan work order berhasil diproses.');
    }
}

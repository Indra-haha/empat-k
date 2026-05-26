<?php

namespace App\Http\Controllers;
use App\Models\Order;
use App\Models\WorkOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkOrderController extends Controller
{
    public function index()
    {
        $this->authorizeAction('view', WorkOrder::class);
        $orders= WorkOrder::with('product')->get();
        return Inertia::render('WorkOrder/Index', [
            'work-orders' => $orders->map(function ($order) {
                return [
                    'id' => $order->work_order_id,
                    'product_name' => $order->product->name,
                    'quantity' => $order->quantity,
                    'status' => $order->status,
                ];
            }),
        ]);
    }

    public function showWorkOrder($id)
    {
        $order = WorkOrder::with('product')->findOrFail($id);
        return inertia('WorkOrder/Show', compact('order'));
    }
}
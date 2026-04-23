<?php

namespace App\Http\Controllers;
use App\Models\Invoice;
use App\Models\OrderStatusHistory;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
class InvoiceController extends Controller
{
    public function index()
    {
        $this->authorizeAction('view', Invoice::class);
        $role = Auth::user()->role;
        $invoices = [];
        if ($role === 'pelanggan') {
            $invoices = Order::with('invoice', 'latestStatus')
                ->where('user_id', Auth::user()->user_id)
                ->whereHas('latestStatus', function ($query) {
                    $query->whereIn('status', ['partial_paid', 'full_paid']);
                })
                ->get();

            $invoices = $invoices->map(function ($order) {
                $invoice = $order->invoice
                    ? $order->invoice->first()
                    : $order->invoice;

                return [
                    'invoice_no' => $invoice?->invoice_number ?? null,
                    'order_id' => $order->order_id,
                    'total' => $invoice?->total_amount ?? null,
                    'img_tagihan' => $invoice?->url_img_tagihan ?? null,
                    'status' => $order->latestStatus->status,
                ];
            });
        }

        return Inertia::render("${role}/InvoicePage/InvoiceList", [
            'nota' => $invoices
        ]);

    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'order_id' => 'required|exists:orders,order_id',
            'invoice_no' => 'required|string|unique:invoices,invoice_number',
            'url_img_tagihan' => 'required|file|mimes:jpg,jpeg,png|max:5120',
            'total_amount' => 'required|numeric',
        ]);
        sleep(2);
        try {
            if ($request->hasFile('url_img_tagihan')) {
                $file = $request->file('url_img_tagihan');

                // Gunakan nama file yang bersih
                $fileName = str_replace(['/', '\\', ' '], '-', $request->invoice_no) . '.png';

                // Simpan ke disk 'private'
                $path = $file->storeAs('tagihan', $fileName, 'private');

                Invoice::updateOrCreate(
                    ['order_id' => $request->order_id], // Key pencarian
                    [
                        'invoice_number' => $request->invoice_no,
                        'total_amount' => $request->total_amount,
                        'url_img_tagihan' => $path,
                    ]
                );

                OrderStatusHistory::with('order')
                    ->where('order_id', $request->order_id)
                    ->create([
                        'order_id' => $request->order_id,
                        'status' => 'partial_paid',
                        'created_by' => Auth::user()->user_id,
                    ]);

                return back()->with('success', 'Tagihan Berhasil Disimpan!');
            }
        } catch (\Exception $e) {
            // Jika gagal simpan/upload, kirim error ke frontend
            return back()->withErrors(['error' => 'Gagal simpan: ' . $e->getMessage()]);
        }

        return back()->withErrors(['url_img_tagihan' => 'File tidak ditemukan']);
    }
    public function show(Request $request)
    {
        $this->authorizeAction('view', Invoice::class);
        $path = $request->query('file'); // Isinya: tagihan/INV-xxx.png

        if (!auth()->check()) {
            abort(401, 'Session habis, silakan login ulang.');
        }

        if (!$path)
            abort(400, 'Path file kosong.');

        $fullPath = storage_path("app/private/{$path}");

        if (!file_exists($fullPath)) {
            abort(404, "File tidak ada di: " . $fullPath);
        }

        return response()->file($fullPath);
    }
}

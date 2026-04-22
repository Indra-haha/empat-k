<?php

namespace App\Http\Controllers;
use App\Models\Invoice;
use App\Models\OrderStatusHistory;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class InvoiceController extends Controller
{
    public function index()
    {
        $this->authorizeAction('view', Invoice::class);

        $invoices = Invoice::with('latestStatus')->get()->map(function ($invoice) {
            return [
                'no' => $invoice->id,
                'order' => $invoice->order_id,
                'invoice_no' => $invoice->invoice_number,
                'total' => $invoice->total_amount,
                'img' => $invoice->url_img,
                'status' => $invoice->latestStatus?->status ?? 'No Status',
            ];
        });
        return Inertia::render('accounting/InvoicePage/InvoiceList', [
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
}

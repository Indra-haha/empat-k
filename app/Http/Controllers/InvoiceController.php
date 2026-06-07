<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\OrderStatusHistory;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\CloudinaryService;

class InvoiceController extends Controller
{
    protected $cloudinary;
    public function __construct(CloudinaryService $cloudinary)
    {
        $this->cloudinary = $cloudinary;
    }

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

            $cloudinary = $this->cloudinary;

            $invoices = $invoices->map(function ($order) use ($cloudinary) {
                $invoice = $order->invoice instanceof \Illuminate\Support\Collection
                    ? $order->invoice->first()
                    : $order->invoice;

                $tagihanPublicId = $invoice?->url_img_tagihan ?? null;
                $buktiPublicId = $invoice?->url_img_bukti ?? null;

                return [
                    'invoice_no' => $invoice?->invoice_number ?? null,
                    'order_id' => $order->order_id,
                    'total' => $invoice?->total_amount ?? null,

                    'img_tagihan' => $tagihanPublicId
                        ? $cloudinary->getSignedUrl($tagihanPublicId, 300)
                        : null,
                    'status' => $order->latestStatus->status,
                    'img_bukti' => $buktiPublicId
                        ? $cloudinary->getSignedUrl($buktiPublicId, 300)
                        : null,
                ];
            });
        }

        return Inertia::render("{$role}/InvoicePage/InvoiceList", [
            'nota' => $invoices
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizeAction('create', Invoice::class);

        $this->validate($request, [
            'order_id'         => 'required|exists:orders,order_id',
            'invoice_no'       => 'required|string|unique:invoices,invoice_number',
            'url_img_tagihan'  => 'required|file|mimes:jpg,jpeg,png|max:5120',
            'total_amount'     => 'required|numeric',
        ]);

        if (!$request->hasFile('url_img_tagihan')) {
            return back()->withErrors(['url_img_tagihan' => 'File tidak ditemukan']);
        }

        try {
            $order = Order::findOrFail($request->order_id);
            $extension      = $request->file('url_img_tagihan')->getClientOriginalExtension();
            $storedPublicId = $this->cloudinary->upload($request->file('url_img_tagihan')->getRealPath(), [
                'folder' => 'tagihan',
                'public_id' => 'INV-' . date('ymd') . '-' . $order->order_id,
                'type' => 'private',
            ]);

            Invoice::updateOrCreate(
                ['order_id' => $request->order_id],        // WHERE
                [
                    'invoice_number'  => $request->invoice_no,
                    'total_amount'    => $request->total_amount,
                    'url_img_tagihan' => $storedPublicId['public_id'] . "." . $extension,  // contoh: "tagihan/INV-250607-12.jpg"
                ]
            );

            OrderStatusHistory::create([
                'order_id'   => $request->order_id,
                'status'     => 'partial_paid',
                'created_by' => Auth::user()->user_id,
            ]);

            return back()->with('success', 'Tagihan berhasil disimpan!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal upload: ' . $e->getMessage()]);
        }
    }

    public function uploadBukti(Request $request)
    {
        $this->authorizeAction('update', Invoice::class);

        $this->validate($request, [
            'invoice_no'      => 'required|string|exists:invoices,invoice_number',
            'url_img_bukti'   => 'required|file|mimes:jpg,jpeg,png|max:5120',
        ]);

        if (!$request->hasFile('url_img_bukti')) {
            return back()->withErrors(['url_img_bukti' => 'File tidak ditemukan']);
        }

        try {
            $file      = $request->file('url_img_bukti');
            $extension      = $request->file('url_img_bukti')->getClientOriginalExtension();
            $order = Order::whereHas('invoice', function ($query) use ($request) {
                $query->where('invoice_number', $request->invoice_no);
            })->firstOrFail();
            $storedPublicId = $this->cloudinary->upload($file->getRealPath(), [
                'folder' => 'bukti',
                'public_id' => 'INV-' . date('ymd') . '-' . $order->order_id,
                'type' => 'private',
            ]);

            Invoice::where('invoice_number', $request->invoice_no)->update([
                'url_img_bukti' => $storedPublicId['public_id'] . '.' . $extension, // contoh: "bukti/INV-250607-12.png"
                'status_bukti'  => 'pending',
            ]);

            return back()->with('success', 'Bukti pembayaran berhasil disimpan!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal upload: ' . $e->getMessage()]);
        }
    }

    public function show(Request $request, CloudinaryService $cloudinary)
    {
        $this->authorizeAction('view', Invoice::class);

        $publicId = $request->query('file'); // Contoh: "tagihan/INV-xxx" atau "bukti/INV-xxx"

        if (!Auth::check()) {
            abort(401, 'Session habis, silakan login ulang.');
        }

        if (!$publicId) {
            abort(400, 'Path file kosong.');
        }

        // 🔐 TAMBAHKAN PERMISSION CHECK DISINI
        if (!$this->canAccessFile($publicId)) {
            abort(403, 'Anda tidak memiliki akses ke file ini');
        }

        $signedUrl = $cloudinary->getSignedUrl($publicId, 300);

        return redirect($signedUrl);
    }

    public function updateStatus(Request $request, $id)
    {
        $this->authorizeAction('update', Invoice::class);
        $this->validate($request, [
            'status' => 'required|in:approved,rejected',
        ]);

        Invoice::where('invoice_number', $id)->update(['status_bukti' => $request->status]);

        return back()->with('success', "Invoice {$request->status}!");
    }

    /**
     * 🔐 Cek apakah user berhak mengakses file
     */
    private function canAccessFile($publicId)
    {
        $user = Auth::user();

        // Admin, Accounting, CS bisa akses SEMUA
        if (in_array($user->role, ['admin', 'accounting', 'cs'])) {
            return true;
        }

        // Extract invoice_number dari public_id
        // Contoh: "tagihan/INV-220426-25" -> "INV-220426-25"
        if (preg_match('/(?:tagihan|bukti)\/(INV-\d+)/', $publicId, $matches)) {
            $invoiceNumber = $matches[1];

            // Cari invoice
            $invoice = Invoice::where('invoice_number', $invoiceNumber)->first();

            if (!$invoice) {
                return false;
            }

            // Cari order dari invoice
            $order = Order::find($invoice->order_id);

            if (!$order) {
                return false;
            }

            // Pelanggan: hanya bisa akses miliknya sendiri
            if ($user->role === 'pelanggan' || $user->role === 'customer' || $user->role === 'accounting') {
                return $order->user_id === $user->id;
            }
        }

        return false;
    }
}

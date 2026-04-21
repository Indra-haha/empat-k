<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
use App\Models\CustomRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
class RequestsController extends BaseController
{
    public function index()
    {
        $this->authorizeAction('view', CustomRequest::class);
        $role = Auth::user()->role;
        $role === 'desainer' ?
            $customrequests = CustomRequest::with('product')->get() :
            $customrequests = CustomRequest::with('product')->where('user_id', Auth::user()->user_id)->get();
        return Inertia("{$role}/RequestPage/RequestList", [
            'requests' => $customrequests->map(function ($request) {
                return [
                    'no' => $request->request_id,
                    'user' => $request->user->name,
                    'upload_image' => $request->upload_img,
                    'product' => $request->product->name,
                    'img_product' => $request->product->url_img,
                    'description' =>
                        [
                            'teks' => $request->description['teks_font'] ?? null,
                            'style' => $request->description['gaya_desain'] ?? null,
                            'color' => $request->description['warna_dominan'] ?? null,
                            'reference' => $request->description['referensi_virtual'] ?? null,
                            'focus_spot' => $request->description['titik_fokus_revisi'] ?? null
                        ],
                    'status' => $request->status,
                    'fee' => $request->fee,
                    'create' => Carbon::parse($request->updated_at)
                        ->locale('id')
                        ->translatedFormat('d F Y'),
                ];
            }),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizeAction('create', CustomRequest::class);

        $desc = $request->validate([
            'teks_font' => 'required|string',
            'gaya_desain' => 'required|string',
            'warna_dominan' => 'required|string',
            'referensi_virtual' => 'required|string',
            'titik_fokus_revisi' => 'required|string',
        ]);

        $data = $request->validate([
            'product_id' => 'required',
            'description' => $desc,
        ]);

        CustomRequest::create([
            'product_id' => $data['product_id'],
            'user_id' => Auth::user()->user_id,
            'description' => $data['description'],
        ]);

        return redirect()->route('products.index')->with('success', 'Custom request created successfully.');
    }

    public function updateGambar(Request $request, $id)
    {
        // 1. Authorize (Pastikan desainer yang melakukan ini)
        $this->authorizeAction('update', CustomRequest::class);

        // 2. Masukkan ID dari parameter URL ke dalam request agar bisa divalidasi
        $request->merge(['request_id' => $id]);

        // 3. Validasi bersamaan
        $request->validate([
            'request_id' => 'required|exists:custom_requests,request_id',
            'url_img' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ], [
            'url_img.required' => 'File gambar wajib diunggah.',
            'url_img.image' => 'File harus berupa gambar.',
            'url_img.max' => 'Ukuran gambar maksimal 2MB.',
        ]);

        // 4. Cari data berdasarkan ID
        $customRequest = CustomRequest::findOrFail($id);

        // 5. Proses File
        if ($request->hasFile('url_img')) {
            // Hapus gambar lama jika ada di storage (biar hemat ruang)
            if ($customRequest->upload_img) {
                Storage::disk('public')->delete($customRequest->upload_img);
            }

            // Simpan file baru ke folder 'uploads/desain' di disk public
            $path = $request->file('url_img')->store('uploads/desain', 'public');

            // 6. Update database
            $customRequest->update([
                'upload_img' => $path,
                'status' => 'finished', // Otomatis set jadi selesai
            ]);

            return redirect()->back()->with('success', 'Hasil desain berhasil dikirim!');
        }

        return redirect()->back()->with('error', 'Gagal mengunggah gambar.');
    }
}

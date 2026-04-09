<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
use App\Models\CustomRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RequestsController extends BaseController
{
    public function index()
    {
        $this->authorizeAction('viewAny');
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
                    'create' => $request->created_at->format('Y-m-d H:i:s'),
                ];
            }),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizeAction('create');
        
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
}

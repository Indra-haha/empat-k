<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index()
    {
        // Logic untuk menampilkan daftar pesanan
    }

    public function create($id): Response
    {
        return Inertia::render(`pelanggan/product/${id}`);
    }

}

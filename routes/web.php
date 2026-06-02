<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RequestsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\WorkOrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->middleware('guest');

Route::get('/auth', function () {
    $user = auth()->user();
    if ($user->role == 'pelanggan') return redirect()->route('products.index');
    if ($user->role == 'cs') return redirect()->route('orders.index');
    if ($user->role == 'accounting') return redirect()->route('orders.index');
    if ($user->role == 'desainer') return redirect()->route('requests.index');
    if ($user->role == 'kp') return redirect()->route('work-orders.index');
    // return redirect('/products'); // fallback default
})->middleware('auth');

Route::middleware(['auth', 'role:cs,pelanggan,accounting'])->group(function () {
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/product/{id}', [ProductController::class, 'show'])->name('products.show');
    Route::get('/orders', [OrderController::class,'index'])->name('orders.index');
    Route::get('/order/{id}', [OrderController::class,'show'])->name('orders.show');   
    Route::get('/invoices', [InvoiceController::class, 'index'])->name('invoices.index'); 
});

Route::middleware(['auth', 'role:pelanggan'])->group(function () {
    Route::get('/product/{id}/instant-buying', [ProductController::class, 'instantBuying'])->name('products.instantBuying');
    Route::post('/product/buyout', [OrderController::class,'store'])->name('orders.store');
    Route::get('/product/{id}/custom', [ProductController::class, 'custom'])->name('products.custom');
    Route::post('/product/customReq', [RequestsController::class, 'store'])->name('requests.store'); 
    Route::get('/show-invoice', [InvoiceController::class, 'show'])->name('invoices.show');
});

Route::middleware(['auth', 'role:cs'])->group(function () {
    Route::post('/products/add', [ProductController::class, 'store'])->name('products.store');
    Route::patch('/orders/{id}', [OrderController::class, 'updateStatus'])->name('orders.updateStatus');
});

Route::middleware(['auth', 'role:desainer,pelanggan'])->group(function () {
    Route::get('/requests', [RequestsController::class, 'index'])->name('requests.index');
    Route::get('/requests/show/{id}', [RequestsController::class, 'show'])->name('requests.show');
});

Route::middleware(['auth', 'role:desainer'])->group(function () {
    Route::patch('/requests/{id}', [RequestsController::class, 'updateGambar'])->name('requests.updateGambar');
});

Route::middleware(['auth', 'role:cs,kp'])->group(function () {
    Route::get('/work-order', [WorkOrderController::class, 'index'])->name('work-orders.index');
    Route::get('/work-order/{id}', [WorkOrderController::class, 'showWorkOrder'])->name('work-orders.showWorkOrder');
    Route::post('work-order', [WorkOrderController::class, 'store'])->name('work-orders.store');
});

Route::middleware(['auth', 'role:accounting,pelanggan'])->group(function () {
   Route::post('/invoices/store', [InvoiceController::class, 'store'])->name('invoices.store');
   Route::patch('/invoice/upload-bukti', [InvoiceController::class, 'uploadBukti'])->name('invoice.uploadBukti');
   Route::get('/show-bukti', [InvoiceController::class, 'show'])->name('invoice.show');
   Route::patch('/invoices/{id}/update-status', [InvoiceController::class, 'updateStatus'])->name('invoices.updateStatus');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::fallback(function () {
    return back(); 
});

require __DIR__ . '/auth.php';

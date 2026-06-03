<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkOrder extends Model
{
    protected $table = 'work_orders';
    protected $primaryKey = 'wo_id';
    protected $fillable = [
        'order_id', 
        'status_pengerjaan', // process, finished, dll
        'ukuran',
        'bahan',
        'finishing',
        'img_laporan'
    ];

    /**
     * Relasi balik ke Order.
     */
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id'); 
    }
}


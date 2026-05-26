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
        'url_gambar_work_order', // URL gambar hasil pengerjaan
        'url_gambar_laporan' // URL gambar laporan'[;;;;;;;;;;;;;;;;;;;]
    ];

    /**
     * Relasi balik ke Order.
     */
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}


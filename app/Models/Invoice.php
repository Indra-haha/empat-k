<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = [
        'order_id',
        'invoice_number', 
        'total_amount', 
        'url_img_tagihan',
        'url_img_bukti'
    ];

    protected $hidden = [
        'created_at', 
        'updated_at'
    ];


    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}
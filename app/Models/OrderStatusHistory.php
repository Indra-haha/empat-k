<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderStatusHistory extends Model
{
    //
    protected $fillable = [
        'order_id',
        'status',
        'changed_by',
        'changed_at'
    ];

    // relasi ke order
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'order_id');
    }

    // relasi ke user yang mengubah
    public function user()
    {
        return $this->belongsTo(User::class, 'changed_by', 'user_id');
    }
}

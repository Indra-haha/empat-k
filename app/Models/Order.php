<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Order extends Model
{
    protected $primaryKey = 'order_id'; // Beritahu Laravel primary key-nya bukan 'id'
    protected $fillable = [
        'user_id',
        'product_id',
        'request_id',
        'quantity',
        'price',
        'total_price',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function request()
    {
        return $this->hasOne(CustomRequest::class, 'request_id');
    }

     public function statusHistories()
    {
        return $this->hasMany(OrderStatusHistory::class, 'order_id', 'order_id');
    }

    // mengambil status terbaru dari history
    public function latestStatus()
    {
        return $this->hasOne(OrderStatusHistory::class, 'order_id', 'order_id')->latestOfMany();
    }
}
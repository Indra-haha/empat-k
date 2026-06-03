<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class CustomRequest extends Model
{
    protected $primaryKey = 'request_id';
    protected $table = 'custom_requests';
    protected $casts = [
        'description' => 'array', 
    ];
    protected $fillable = [
        'user_id',
        'product_id',
        'description',
        'upload_img',
        'status',
        'fee'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function order()
    {
        return $this->hasOne(Order::class, 'request_id', 'request_id');
    }

}
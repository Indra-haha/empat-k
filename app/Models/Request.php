<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Request extends Model
{
    protected $table = 'request_id';

    protected $fillable = [
        'user_id',
        'product_id',
        'massage',
        'upload_img',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

}
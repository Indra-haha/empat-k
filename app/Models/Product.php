<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Product extends Model
{
    protected $primaryKey = 'product_id'; // Beritahu Laravel primary key-nya bukan 'id'
    protected $fillable = [
        'name',
        'category',
        'description',
        'price',
        'url_img'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category');
    }
}
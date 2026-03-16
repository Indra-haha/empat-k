<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $primaryKey = 'category_id'; // Beritahu Laravel primary key-nya bukan 'id'
    protected $fillable = [
        'id',
        'name',
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'category');
    }
}
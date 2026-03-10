<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use app\Models\Request;

class User extends Authenticatable
{
    protected $primaryKey = 'user_id'; // Beritahu Laravel primary key-nya bukan 'id'
    protected $fillable = [
        'name',
        'username',
        'password',
        'no_hp',
        'role',
    ];

    protected $hidden = [
        'remember_token',
    ];
    
    // Mutator untuk hash password otomatis
    public function setPasswordAttribute($value)
    {
        if ($value) {
            $this->attributes['password'] = Hash::make($value);
        }
    }

    public function request()
    {
        return $this->hasMany(Request::class, 'user_id');
    }
}

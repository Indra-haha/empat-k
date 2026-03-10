<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProductPolicy
{
    public function viewAny(User $user)
    {
        return in_array($user->role, ['cs', 'pelanggan']);
    }

    public function create(User $user)
    {
        return $user->role === 'cs';
    }

    public function update(User $user, Product $product)
    {
        return $user->role === 'cs';
    }

    public function delete(User $user, Product $product)
    {
        return $user->role === 'cs';
    }
}

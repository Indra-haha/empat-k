<?php

namespace App\Policies;

use App\Models\Invoice;
use App\Models\User;

class OrderPolicy
{
    public function view(User $user)
    {
        return in_array($user->role, ['cs', 'pelanggan', 'accounting']);
    }   
    public function create(User $user)
    {
        return $user->role === 'pelanggan';
    }

    public function update(User $user)
    {
        return $user->role === 'cs';
    }

    public function delete(User $user)
    {
        return $user->role === 'cs';
    }
}
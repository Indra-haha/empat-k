<?php

namespace App\Policies;
use App\Models\User;

class CustomRequestPolicy
{
    public function view(User $user)
    {
        return in_array($user->role, ['desainer', 'pelanggan']);
    }

    public function create(User $user)
    {
        return $user->role === 'pelanggan';
    }

    public function update(User $user)
    {
        return in_array($user->role, ['desainer', 'pelanggan']);
    }

    public function delete(User $user)
    {
        return in_array($user->role, ['desainer', 'pelanggan']);
    }
}
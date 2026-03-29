<?php

namespace App\Policies;

use App\Models\CustomRequest;
use App\Models\User;

class RequestPolicy
{
    public function viewAny(User $user)
    {
        return in_array($user->role, ['desainer', 'pelanggan']);
    }

    public function create(User $user)
    {
        return $user->role === 'pelanggan';
    }

    public function update(User $user, CustomRequest $request)
    {
        return $user->role === 'desainer' || ($user->role === 'pelanggan' && $request->user_id === $user->id);
    }

    public function delete(User $user, CustomRequest $request)
    {
        return $user->role === 'desainer' || ($user->role === 'pelanggan' && $request->user_id === $user->id);
    }
}
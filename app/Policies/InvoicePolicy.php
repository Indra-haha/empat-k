<?php

namespace App\Policies;

use App\Models\Invoice;
use App\Models\User;
class InvoicePolicy
{
    public function view(User $user)
    {
        return in_array($user->role, ['cs', 'pelanggan', 'accounting']);
    }   
    public function create(User $user)
    {
        return $user->role === 'accounting';
    }

    public function update(User $user)
    {
        return in_array($user->role, ['accounting', "pelanggan"]);
    }

    public function delete(User $user)
    {
        return $user->role === 'accounting';
    }
}

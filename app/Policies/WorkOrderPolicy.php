<?php

namespace App\Policies;

use App\Models\User;

class WorkOrderPolicy
{
    public function view(User $user)
    {
        return in_array($user->role, ['cs', 'kp']);
    } 

    public function create(User $user)
    {
        return $user->role === 'cs';
    }
    
    public function update(User $user)
    {
        return in_array($user->role, ['cs', 'kp']);
    }
}
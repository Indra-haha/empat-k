import { CustomerLayout } from '@/Layouts/CustomerLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import React from 'react';

export default function Welcome() {
    return (
        <GuestLayout>
            <div className="flex items-center justify-center h-full">
                <h1 className="text-4xl font-bold">Welcome to the Application!</h1>
            </div>
        </GuestLayout>
    );
}
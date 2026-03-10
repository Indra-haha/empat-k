import React from 'react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-grey-200 pt-6 sm:justify-center sm:pt-0">
            <div className="flex min-h-screen my-auto flex-col items-center pt-6 justify-center sm:pt-0 px-4">
                <div className="w-full sm:max-w-md px-6 py-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

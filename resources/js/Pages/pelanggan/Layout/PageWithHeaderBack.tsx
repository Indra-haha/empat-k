import { ChevronLeft } from "@untitledui/icons";
import { Link } from '@inertiajs/react';
import React from "react";

export function PageWithHeaderBack({ title, children }) {
    return (
        <section className="flex flex-col max-w-[425px] h-screen mx-auto bg-gray-100">
            <header className="h-16 flex items-center border-b-2 border-green-200 bg-green-200 rounded-b-4xl py-2">
                <main className="max-w-[380px] mx-auto flex flex-row gap-3 w-full px-2">
                    <Link href="/products" className="text-green-800">
                        <ChevronLeft className="text-4xl" />
                    </Link>
                    <h1 className="text-xl font-bold text-green-800">{title}</h1>
                </main>
            </header>
            <main className="p-5 h-full max-w-[380px] mx-auto">{children}</main>
        </section>
    );
}
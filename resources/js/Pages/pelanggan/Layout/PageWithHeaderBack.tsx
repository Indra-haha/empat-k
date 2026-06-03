import { ChevronLeft } from "@untitledui/icons";
import { Link } from '@inertiajs/react';
import React from "react";

export function PageWithHeaderBack({ title, children, route } : { title: string; children: React.ReactNode; route: string }) {
    return (
        <section className="flex flex-col max-w-[450px] h-screen mx-auto bg-gray-100">
            <header className="h-16 flex items-center border-b-2 border-green-200 bg-green-200 rounded-b-4xl py-2">
                <main className="max-w-[380px] mx-5 flex flex-row gap-3 w-full px-2">
                    <Link href={`/${route}`} className="text-green-800">
                        <ChevronLeft className="text-4xl" />
                    </Link>
                    <h2 className="text-xl font-bold text-green-800">{title}</h2>
                </main>
            </header>
            <main className="p-5 h-screen max-w-[400px] mx-5 overflow-y-scroll no-scrollbar ">{children}</main>
        </section>
    );
}
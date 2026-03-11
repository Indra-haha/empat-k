import { Head, usePage } from "@inertiajs/react";
import React from "react";
import { menusByRole } from "../Data/Menu";
import Dropdown from "@/Components/Dropdown";
import { AdminHeader } from "@/Components/Admin/Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const role = user?.role;
    const menus = role != "pelanggan" ? menusByRole[role] : menusByRole.guest;

    // Ambil URL saat ini
    const url = usePage().url; // Contoh: "/admin/products/edit/5"

    // Pisahkan path menjadi array
    const segments = url.split("/").filter(Boolean); // ["admin", "products", "edit", "5"]

    // Ambil segment yang akan jadi title dan addUrl
    const currentSection = segments[segments.length - 1] || segments[segments.length - 2] || "dashboard";

    // Title: ubah dash menjadi spasi & capitalize
    const title = currentSection.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    
    console.log("Current URL:", url);
    console.log("Segments:", segments);
    console.log("Title:", title);

    return (
        <>
            <Head title={title} />
            <section className="flex flex-col h-screen w-full">
                {/* Header user dropdown */}
                <div className="flex h-16 justify-end items-center w-full border-b-2 border-gray-200 px-5">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                >
                                    {user.name}

                                    <svg
                                        className="-me-0.5 ms-2 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Link href={route("profile.edit")}>
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link href={route("logout")} method="post" as="button">
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>

                <div className="flex flex-row h-full">
                    {/* Sidebar */}
                    <aside className="flex flex-col w-50 h-full items-center justify-center bg-accent bg-yellow-500">
                        {menus.map((menu) => (
                            <a
                                key={menu.route}
                                href={menu.route}
                                className={`block px-4 py-2 text-sm font-medium text-white hover:bg-gray-700` + (url === menu.route ? ' bg-gray-700' : '') }
                            >
                                {menu.name}
                            </a>
                        ))}
                    </aside>

                    {/* Main Content */}
                    <main className="flex flex-col w-full bg-white shadow-sm sm:rounded-lg">
                        <AdminHeader title={title} addUrl={url} />
                        {children as React.ReactNode}
                    </main>
                </div>
            </section>
        </>
    );
}
import { usePage } from "@inertiajs/react";
import React from "react";
import { menusByRole } from "../Data/Menu";
import Dropdown from "@/Components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faDollarSign,
    faLayerGroup,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faPenClip } from "@fortawesome/free-solid-svg-icons/faPenClip";

const logo = (menuName: string) => {
    switch (menuName) {
        case "/products":
            return faCartShopping;
        case "/orders":
            return faLayerGroup;
        case "/requests":
            return faPenClip;
    }
};

export function CustomerLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const role = user?.role;
    const menus = role === "pelanggan" ? menusByRole[role] : menusByRole.guest;

    // Ambil URL saat ini
    const url = usePage().url; // Contoh: "/admin/products/edit/5"

    // Pisahkan path menjadi array
    const segments = url
        .split("/")
        .filter(Boolean)
        .map((seg) => (seg.endsWith("s") ? seg.slice(0, -1) : seg));

    // Ambil segment yang akan jadi title dan addUrl
    const currentSection =
        segments[segments.length - 1] ||
        segments[segments.length - 2] ||
        "dashboard";

    // Title: ubah dash menjadi spasi & capitalize
    const title = currentSection
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

    return (
        <section className="flex flex-col max-w-[425px] h-screen mx-auto bg-gray-100">
            <header className="h-16 flex flex-row justify-between items-center gap-auto border-2 border-green-200 bg-green-200 rounded-b-4xl px-5 py-2">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full">
                    <FontAwesomeIcon
                        icon={faDollarSign}
                        className="text-3xl text-green-800"
                        href={menus[3].route}
                    />
                </div>
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-full">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center bg-green-800 w-12 h-12 rounded-full"
                            >
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="text-2xl text-white"
                                />
                            </button>
                        </span>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Link href={route("profile.edit")}>
                            Profile
                        </Dropdown.Link>
                        <Dropdown.Link
                            href={route("logout")}
                            method="post"
                            as="button"
                        >
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </header>
            <main className="h-full items-center justify-center p-4">
                {children}
            </main>
            <footer className="h-16 flex items-between justify-between bg-green-200 border-t border-green-300 rounded-t-4xl">
                {menus.slice(0, 3).map((menu) => (
                    <a
                        key={menu.name}
                        href={menu.route}
                        className="flex flex-col gap-1 justify-between w-full pt-4 pb-3"
                    >
                        <FontAwesomeIcon
                            icon={logo(menu.route)}
                            className={
                                `mx-auto text-xl` +
                                (segments[0] === menu.name.toLowerCase()
                                    ? " text-yellow-600"
                                    : " text-green-800")
                            }
                        />
                        <span
                            className={
                                `w-full text-center text-sm` +
                                (segments[0] === menu.name.toLowerCase()
                                    ? " text-yellow-600 font-bold"
                                    : " text-green-800")
                            }
                        >
                            {menu.name}
                        </span>
                    </a>
                ))}
            </footer>
        </section>
    );
}

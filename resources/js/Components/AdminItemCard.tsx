import React from "react";
import { AdminItemCardProps } from "../Types/AdminItemCard";
import PrimaryButton from "@/Components/PrimaryButton";
export default function AdminItemCard({
    url_img,
    judul,
    tgl,
    quantity,
    status,
    onClick,
}: AdminItemCardProps) {
    return (
        <section className="flex flex-row w-full justify-around border-2 border-black">
            <header className="w-1/9 border-2 border-black p-2">
                <img
                    src={url_img}
                    alt={judul}
                    className="aspect-square object-cover rounded-md border-2 border-black"
                />
            </header>

            <main className="flex flex-col w-7/9 p-2 justify-start text-green-800 border-2 border-black">
                <h1 className="text-[20px] text-extrabold w-full mb-1">{judul}</h1>
                <span className="text-[14px] text-normal w-full mb-3">{tgl}</span>
                <span className="text-[14px] text-normal w-full">
                    Jumlah : {quantity}
                </span>
            </main>

            <div className="flex flex-col w-1/9 justify-between text-green-800 border-2 border-black p-2">
                <span className="px-4 py-2 rounded-4 bg-green-400">
                    {status}
                </span>
                <PrimaryButton
                    disabled={undefined}
                    children="Detail"
                ></PrimaryButton>
            </div>
        </section>
    );
}

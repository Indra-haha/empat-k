import React from "react";
import { AdminItemCardProps } from "../Types/AdminItemCard";
import PrimaryButton from "@/Components/PrimaryButton";
import { LazyLoadImage } from "react-lazy-load-image-component";

export function AdminItemCard({
    url_img,
    judul,
    tgl,
    keterangan,
    status,
    onClick,
}: AdminItemCardProps) {
    return (
        <section className="flex flex-row w-full justify-around bg-green-100 mb-4 p-2 rounded-xl">
            <header className="w-1/9 p-2">
                <LazyLoadImage
                    src={`/storage/${url_img}`}
                    alt={judul}
                    width={200}
                    height={100}
                    className="object-cover aspect-square"
                />
            </header>

            <main className="flex flex-col w-7/9 p-2 justify-start text-green-800">
                <h1 className="text-[20px] text-extrabold w-full mb-1">
                    {judul}
                </h1>
                <span className="text-[14px] text-normal w-full mb-3">
                    {tgl}
                </span>
                <span className="text-[14px] text-normal w-full">
                    {keterangan}
                </span>
            </main>

            <div className="flex flex-col w-1/9 justify-between text-green-800 p-2">
                <span className="px-4 py-2 rounded-4 bg-green-400">
                    {status}
                </span>
                <PrimaryButton
                    disabled={undefined}
                    children="Detail"
                    onClick={onClick}
                ></PrimaryButton>
            </div>
        </section>
    );
}

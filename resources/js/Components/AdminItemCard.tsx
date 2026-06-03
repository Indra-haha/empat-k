import React from "react";
import { AdminItemCardProps } from "../Types/AdminItemCard";
import PrimaryButton from "@/Components/PrimaryButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatWord } from "@/utils/Formater";

export function AdminItemCard({
    url_img,
    judul,
    tgl,
    keterangan,
    status,
    status_bukti_tagihan,
    onClick,
}: AdminItemCardProps) {
    console.log("Rendering AdminItemCard with props:", {
        url_img,
        judul,
        tgl,
        keterangan,
        status,
        status_bukti_tagihan,
    }); // Debug: Lihat data yang diterima di card
    return (
        <section className="flex flex-row w-full justify-around bg-green-100 mb-4 p-2 rounded-xl">
            <header className="w-1/9 p-2">
                <LazyLoadImage
                    src={url_img}
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

            <div className="flex flex-col w-2/9 justify-between text-green-800 p-2 gap-7">
                <div className="flex flex-col gap-2 items-end">
                    <span className="px-4 py-2 rounded-4 bg-green-400 w-full text-center rounded-xl">
                        {formatWord(status)}
                    </span>
                    {status.endsWith('paid') ? status_bukti_tagihan === null ? (
                        <span className="px-4 py-2 rounded-4 bg-yellow-400 w-fit rounded-xl">
                            Belum dibayar
                        </span>
                    ) : (<span className="px-4 py-2 rounded-4 bg-blue-400 text-black w-fit rounded-xl">
                        {formatWord(status_bukti_tagihan!)}
                    </span>): null}
                </div>
                
                <PrimaryButton
                    disabled={undefined}
                    children="Detail"
                    onClick={onClick}
                ></PrimaryButton>
            </div>
        </section>
    );
}

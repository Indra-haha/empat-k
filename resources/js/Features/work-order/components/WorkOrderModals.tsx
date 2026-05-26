// Di dalam WorkOrderModals.tsx
import React from "react";
import { createPortal } from "react-dom"; // 1. Tambahkan import ini

interface WorkOrderModalsProps {
    selectedOrder: any;
    onClose: () => void;
}

export default function WorkOrderModals({
    selectedOrder,
    onClose,
}: WorkOrderModalsProps) {
    console.log("this wo", selectedOrder);

    // 2. Bungkus return dengan createPortal agar dirender di luar OrderModals
    return createPortal(
        <div
            className="fixed inset-0 bg-black/70 flex justify-center items-center py-10"
            style={{ zIndex: 9999 }}
        >
            <div className="size- p-10 bg-zinc-500 rounded-[20px] inline-flex flex-col justify-center items-center gap-5">
                <div className="self-stretch inline-flex justify-center items-center gap-6">
                    <div className="w-48 h-52 relative">
                        <div className="w-48 h-52 left-0 top-0 absolute bg-zinc-300" />
                        <div className="w-14 h-12 left-[71px] top-[81px] absolute bg-white" />
                    </div>
                    <div className="w-96 h-52 pt-2.5 inline-flex flex-col justify-start items-start gap-6">
                        <div className="self-stretch h-10 inline-flex justify-start items-center">
                            <div className="flex-1 px-5 py-[5px] flex justify-end items-center gap-2.5">
                                <div className="justify-center text-white text-sm font-medium font-['Inter']">
                                    No Pesanan
                                </div>
                            </div>
                            <div className="w-40 px-3.5 py-2.5 bg-zinc-300 rounded-tl-[10px] rounded-bl-[10px] flex justify-start items-center gap-2.5">
                                <div className="justify-start text-black text-xs font-normal font-['Inter']">
                                    XSDK2324C
                                </div>
                            </div>
                            <div className="flex-1 px-3.5 py-2.5 bg-neutral-400 rounded-tr-[10px] rounded-br-[10px] flex justify-center items-end gap-2.5">
                                <div className="w-20 text-center justify-center text-white text-xs font-normal font-['Inter']">
                                    Terbayar
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch h-36 flex flex-col justify-start items-start gap-2.5">
                            <div className="self-stretch flex flex-col justify-start items-start gap-5">
                                <div className="self-stretch text-right justify-start">
                                    <span className="text-white text-sm font-semibold font-['Inter']">
                                        Dipesan Tanggal{" "}
                                    </span>
                                    <span className="text-white text-xs font-normal font-['Inter']">
                                        : 21 Agustus 2025
                                        <br />
                                    </span>
                                    <span className="text-white text-sm font-semibold font-['Inter']">
                                        Diterima oleh
                                    </span>
                                    <span className="text-white text-xs font-normal font-['Inter']">
                                        {" "}
                                        : Agusnita Ayunda
                                    </span>
                                </div>
                            </div>
                            <div className="self-stretch px-3.5 py-[5px] bg-zinc-300 rounded-[10px] inline-flex justify-start items-center gap-5">
                                <div className="justify-start">
                                    <span className="text-black text-sm font-semibold font-['Inter']">
                                        Nama Pelanggan{" "}
                                    </span>
                                    <span className="text-black text-xs font-normal font-['Inter']">
                                        : Difa Anugrah Farasya
                                    </span>
                                </div>
                            </div>
                            <div className="self-stretch px-3.5 py-[5px] bg-zinc-300 rounded-[10px] inline-flex justify-start items-center gap-5">
                                <div className="justify-start">
                                    <span className="text-black text-sm font-semibold font-['Inter']">
                                        Nomor Handphone{" "}
                                    </span>
                                    <span className="text-black text-xs font-normal font-['Inter']">
                                        : 0843943843849
                                    </span>
                                </div>
                            </div>
                            <div className="size- px-3.5 py-[5px] bg-zinc-300 rounded-[10px] inline-flex justify-start items-center gap-5">
                                <div className="justify-center text-black text-xs font-normal font-['Inter']">
                                    Pesanan khusus{" "}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="self-stretch inline-flex justify-center items-start gap-5">
                    <div className="w-96 inline-flex flex-col justify-start items-start gap-2.5">
                        <div
                            data-property-1="Variant2"
                            className="self-stretch h-16 flex flex-col justify-start items-start"
                        >
                            <div className="self-stretch pr-5 py-[5px] inline-flex justify-start items-center gap-2.5">
                                <div className="justify-center text-white text-base font-medium font-['Inter']">
                                    Id Produk
                                </div>
                            </div>
                            <div className="self-stretch pl-3.5 pr-5 py-2.5 bg-zinc-300 rounded-[10px] inline-flex justify-start items-center gap-2.5">
                                <div className="justify-start text-black text-xs font-normal font-['Inter']">
                                    lorem
                                </div>
                            </div>
                        </div>
                        <div
                            data-property-1="Variant2"
                            className="self-stretch h-16 flex flex-col justify-start items-start"
                        >
                            <div className="self-stretch pr-5 py-[5px] inline-flex justify-start items-center gap-2.5">
                                <div className="justify-center text-white text-base font-medium font-['Inter']">
                                    Nama Produk
                                </div>
                            </div>
                            <div className="self-stretch pl-3.5 pr-5 py-2.5 bg-zinc-300 rounded-[10px] inline-flex justify-start items-center gap-2.5">
                                <div className="justify-start text-black text-xs font-normal font-['Inter']">
                                    lorem
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch inline-flex justify-start items-center gap-3.5">
                            <div
                                data-property-1="Variant2"
                                className="w-40 h-16 inline-flex flex-col justify-start items-start"
                            >
                                <div className="self-stretch pr-5 py-[5px] inline-flex justify-start items-center gap-2.5">
                                    <div className="justify-center text-white text-base font-medium font-['Inter']">
                                        Jumlah Pesanan
                                    </div>
                                </div>
                                <div className="self-stretch pl-3.5 pr-5 py-2.5 bg-zinc-300 rounded-[10px] inline-flex justify-start items-center gap-2.5">
                                    <div className="justify-start text-black text-xs font-normal font-['Inter']">
                                        lorem
                                    </div>
                                </div>
                            </div>
                            <div
                                data-property-1="Variant2"
                                className="w-48 h-16 inline-flex flex-col justify-start items-start"
                            >
                                <div className="self-stretch pr-5 py-[5px] inline-flex justify-start items-center gap-2.5">
                                    <div className="justify-center text-white text-base font-medium font-['Inter']">
                                        Finishing
                                    </div>
                                </div>
                                <div className="self-stretch pl-3.5 pr-5 py-2.5 bg-zinc-300 rounded-[10px] inline-flex justify-start items-center gap-2.5">
                                    <div className="justify-start text-black text-xs font-normal font-['Inter']">
                                        lorem
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            data-property-1="Variant2"
                            className="self-stretch h-16 flex flex-col justify-start items-start"
                        >
                            <div className="self-stretch pr-5 py-[5px] inline-flex justify-start items-center gap-2.5">
                                <div className="justify-center text-white text-base font-medium font-['Inter']">
                                    Bahan
                                </div>
                            </div>
                            <div className="self-stretch pl-3.5 pr-5 py-2.5 bg-zinc-300 rounded-[10px] inline-flex justify-start items-center gap-2.5">
                                <div className="justify-start text-black text-xs font-normal font-['Inter']">
                                    lorem
                                </div>
                            </div>
                        </div>
                        <div
                            data-property-1="Variant2"
                            className="self-stretch h-16 flex flex-col justify-start items-start"
                        >
                            <div className="self-stretch pr-5 py-[5px] inline-flex justify-start items-center gap-2.5">
                                <div className="justify-center text-white text-base font-medium font-['Inter']">
                                    Ukuran
                                </div>
                            </div>
                            <div className="self-stretch pl-3.5 pr-5 py-2.5 bg-zinc-300 rounded-[10px] inline-flex justify-start items-center gap-2.5">
                                <div className="justify-start text-black text-xs font-normal font-['Inter']">
                                    lorem
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        data-property-1="Default"
                        className="w-52 inline-flex flex-col justify-start items-start gap-2.5"
                    >
                        <div className="self-stretch h-3.5 relative">
                            <div className="left-0 top-0 absolute justify-start text-white text-sm font-semibold font-['Inter']">
                                Desain Custom
                            </div>
                        </div>
                        <div className="self-stretch h-52 relative">
                            <div className="w-48 h-52 left-0 top-0 absolute bg-zinc-300" />
                            <div className="w-14 h-12 left-[71.71px] top-[81px] absolute bg-white" />
                        </div>
                    </div>
                </div>
                <div className="self-stretch h-16 inline-flex justify-center items-center gap-7">
                    <div
                        data-property-1="Variant3"
                        className="w-60 h-16 flex justify-between items-center"
                    >
                        <div className="flex-1 inline-flex flex-col justify-start items-start gap-[5px]">
                            <div className="self-stretch px-5 py-2.5 bg-zinc-300 rounded-[10px] inline-flex justify-center items-center gap-2.5">
                                <div className="w-5 h-7 outline outline-[1.50px] outline-offset-[-0.75px] outline-black" />
                                <div className="justify-start text-black text-2xl font-normal font-['Inter']">
                                    Sesuai
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-60 h-12 px-5 py-2.5 bg-zinc-300 rounded-[10px] flex justify-center items-center gap-2.5">
                        <div className="w-5 h-7 outline outline-[1.50px] outline-offset-[-0.75px] outline-black" />
                        <div className="justify-start text-black text-2xl font-normal font-['Inter']">
                            Buat
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body, // 3. Targetkan langsung ke body HTML
    );
}

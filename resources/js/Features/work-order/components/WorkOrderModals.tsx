"use client";
import React from "react";
import { createPortal } from "react-dom";

interface WorkOrderModalsProps {
    selectedOrder: any;
    onClose: () => void;
}

export default function WorkOrderModals({
    selectedOrder,
    onClose,
}: WorkOrderModalsProps) {
    console.log("this wo", selectedOrder);

    return createPortal(
        <div
            className="fixed inset-0 bg-black/50 overflow-y-auto z-50 justify-center items-center w-full py-10"
            style={{ zIndex: 9999 }}
        >
            <div className="bg-[#8c8c8c] mx-auto max-w-3xl rounded-3xl p-8 shadow-2xl text-gray-800">
                {/* Header */}
                <div className="w-full flex justify-end">
                    <button onClick={onClose} className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    {/* Product Image */}
                    <div className="w-40 h-40 bg-[#d9d9d9] rounded-lg flex items-center justify-center">
                        <div className="w-14 h-12 bg-white" />
                    </div>

                    {/* Order Info */}
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-medium text-sm">No Pesanan</span>
                            <div className="flex rounded-md overflow-hidden">
                                <span className="bg-[#d9d9d9] px-4 py-1 text-sm font-mono text-black">
                                    XSDK2324C
                                </span>
                                <span className="bg-[#b3b3b3] px-4 py-1 text-sm text-white">
                                    Terbayar
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-white text-sm">
                                <strong>Dipesan Tanggal :</strong> 21 Agustus 2025
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="bg-[#d9d9d9] rounded-full px-4 py-1 flex text-sm">
                                <span className="font-bold w-40 text-black">Nama Pelanggan</span>
                                <span className="text-black">: Difa Anugrah Farasya</span>
                            </div>
                            <div className="bg-[#d9d9d9] rounded-full px-4 py-1 flex text-sm">
                                <span className="font-bold w-40 text-black">Nomor Handphone</span>
                                <span className="text-black">: 0843943843849</span>
                            </div>
                            <div className="bg-[#d9d9d9] rounded-full px-4 py-1 inline-block text-sm text-black">
                                Pesanan khusus
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Grid - 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left Column: Product Details */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-white font-bold mb-1 text-sm">Id Produk</label>
                            <div className="bg-[#d9d9d9] rounded-xl p-3 text-gray-600 text-sm">lorem</div>
                        </div>
                        <div>
                            <label className="block text-white font-bold mb-1 text-sm">Nama Produk</label>
                            <div className="bg-[#d9d9d9] rounded-xl p-3 text-gray-600 text-sm">lorem</div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-white font-bold mb-1 text-sm">Jumlah Pesanan</label>
                                <div className="bg-[#d9d9d9] rounded-xl p-3 text-gray-600 text-sm">lorem</div>
                            </div>
                            <div className="flex-1">
                                <label className="block text-white font-bold mb-1 text-sm">Finishing</label>
                                <div className="bg-[#d9d9d9] rounded-xl p-3 text-gray-600 text-sm">lorem</div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-white font-bold mb-1 text-sm">Bahan</label>
                            <div className="bg-[#d9d9d9] rounded-xl p-3 text-gray-600 text-sm">lorem</div>
                        </div>
                        <div>
                            <label className="block text-white font-bold mb-1 text-sm">Ukuran</label>
                            <div className="bg-[#d9d9d9] rounded-xl p-3 text-gray-600 text-sm">lorem</div>
                        </div>
                    </div>

                    {/* Right Column: Custom Design */}
                    <div className="space-y-4">
                        <label className="block text-white font-bold mb-1 text-sm">Desain Custom</label>
                        <div className="w-48 h-48 bg-[#d9d9d9] rounded-lg flex items-center justify-center">
                            <div className="w-14 h-12 bg-white" />
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-12 flex flex-col items-center gap-4">
                    <div className="flex flex-wrap justify-center gap-6">
                        <button className="flex items-center gap-3 bg-[#d9d9d9] hover:bg-gray-200 transition-colors px-8 py-3 rounded-2xl shadow-lg group">
                            <div className="w-5 h-7 outline outline-[1.50px] outline-offset-[-0.75px] outline-black" />
                            <span className="text-2xl font-medium text-black">Sesuai</span>
                        </button>
                        <button className="flex items-center gap-3 bg-[#d9d9d9] hover:bg-gray-200 transition-colors px-8 py-3 rounded-2xl shadow-lg group">
                            <div className="w-5 h-7 outline outline-[1.50px] outline-offset-[-0.75px] outline-black" />
                            <span className="text-2xl font-medium text-black">Buat</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
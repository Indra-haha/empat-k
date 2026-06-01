"use client";
"use strict";
import InputError from "@/Components/InputError";
import { formatWord } from "@/utils/Formater";
import { useForm } from "@inertiajs/react";
import { ClipboardList } from "lucide-react";
import React, { useEffect } from "react";
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
    useEffect(() => {
        if (selectedOrder) {
            setData("order_id", selectedOrder.no);
        }
        return () => reset(); // Otomatis bersihkan inputan form saat modal di-close
    }, [selectedOrder]);
    const { data, setData, processing, post, errors, reset } = useForm({
        order_id: selectedOrder?.no ?? "",
        ukuran: "",
        bahan: "",
        finishing: "",
    });
    const submitWorkOrder = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        post(route("work-orders.store"), {
            onSuccess: (page) => {
                const flash = page.props.flash as any;
                if (flash.success) {
                    alert(flash.success);
                }
                onClose();
            },
            onError: () => {
                alert("Terjadi kesalahan sistem");
            },
        });
    };
    return createPortal(
        <div
            className="fixed inset-0 bg-black/50 overflow-y-auto z-50 justify-center items-center w-full py-10"
            style={{ zIndex: 9999 }}
        >
            <div className="bg-[#8c8c8c] mx-auto max-w-3xl rounded-3xl p-8 shadow-2xl text-gray-800">
                {/* Header */}
                <div className="w-full flex justify-end">
                    <button onClick={onClose} className="text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    {/* Main Product Image Placeholder */}
                    <div className="w-40 h-40 bg-[#d9d9d9] rounded-lg flex items-center justify-center">
                        <img
                            src={selectedOrder.url_img_product}
                            alt="Product"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-medium">
                                No Pesanan
                            </span>
                            <div className="flex rounded-md overflow-hidden">
                                <span className="bg-[#d9d9d9] px-4 py-1 text-sm font-mono">
                                    {selectedOrder.no}
                                </span>
                                <span className="bg-[#b3b3b3] px-4 py-1 text-sm text-white">
                                    {formatWord(selectedOrder.status)}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-white text-sm">
                                <strong>Dipesan Tanggal :</strong>{" "}
                                {selectedOrder.ordered_by}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="bg-[#d9d9d9] rounded-full px-4 py-1 flex">
                                <span className="font-bold w-40">
                                    Nama Pelanggan
                                </span>
                                <span>: {selectedOrder.user}</span>
                            </div>
                            <div className="bg-[#d9d9d9] rounded-full px-4 py-1 flex">
                                <span className="font-bold w-40">
                                    Nomor Handphone
                                </span>
                                <span>: {selectedOrder.phone}</span>
                            </div>
                            <div className="bg-[#d9d9d9] rounded-full px-4 py-1 inline-block text-sm">
                                {selectedOrder.request
                                    ? `Pesanan Khusus`
                                    : "Pesanan Biasa"}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left Column: Product Info */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-white font-bold mb-1">
                                Nama Produk
                            </label>
                            <div className="bg-[#d9d9d9] rounded-xl p-3 text-gray-600">
                                {selectedOrder.name}
                            </div>
                        </div>
                        <div>
                            <label className="block text-white font-bold mb-1">
                                Ukuran
                            </label>
                            {selectedOrder.stats}
                            <InputError
                                message={errors.ukuran}
                                className="mb-2"
                            />
                            <input
                                type="text"
                                value={data.ukuran}
                                onChange={(e) =>
                                    setData("ukuran", e.target.value)
                                }
                                className="bg-[#d9d9d9] rounded-xl p-3 text-gray-600 w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-white font-bold mb-1">
                                Bahan
                            </label>
                            <InputError
                                message={errors.bahan}
                                className="mt-2"
                            />
                            <input
                                type="text"
                                value={data.bahan}
                                onChange={(e) =>
                                    setData("bahan", e.target.value)
                                }
                                className="bg-[#d9d9d9] rounded-xl p-3 text-gray-600 w-full"
                            />
                        </div>
                    </div>

                    {selectedOrder.url_img_request ? (
                        <div className="space-y-4">
                            <label className="block text-white font-bold mb-1">
                                Dengan Custom Design
                            </label>
                            <img
                                src={selectedOrder.url_img_request}
                                alt="Custom Design "
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        </div>
                    ) : (
                        <>Tidak Ada Permintaan khusus</>
                    )}
                </div>
                <div className="w-full mt-4">
                    <label className="block text-white font-bold mb-1">
                        Finishing
                    </label>
                    <InputError message={errors.finishing} className="mt-2" />
                    <textarea
                        value={data.finishing}
                        onChange={(e) => setData("finishing", e.target.value)}
                        className="bg-[#d9d9d9] rounded-xl p-3 text-gray-600 w-full"
                    />
                </div>
                {/* Footer Actions */}
                <div className="mt-12 flex flex-col items-center gap-4">
                    {selectedOrder.status === "process" ? (
                        <>Sedang diproduksi</>
                    ) : (
                        <div className="flex flex-wrap justify-center gap-6">
                            <button
                                className="flex items-center gap-3 bg-[#d9d9d9] hover:bg-gray-200 transition-colors px-8 py-3 rounded-2xl shadow-lg group"
                                type="button"
                                onClick={submitWorkOrder}
                            >
                                <ClipboardList
                                    size={32}
                                    className="text-gray-600"
                                />
                                <span className="text-2xl font-medium">
                                    {processing ? "Memproses..." : "Buat"}
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body,
    );
}

"use client";
import React, { useState } from "react";
import { OrdersCSProps } from "@/Types/Orders";
import { ClipboardList, FileText, X } from "lucide-react";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { formatPrice, formatWord } from "@/utils/Formater";
import WorkOrderModals from "@/Features/work-order/components/WorkOrderModals";

export default function OrderModals({
    selectedOrder,
    onClose,
}: {
    selectedOrder: OrdersCSProps;
    onClose: () => void;
}) {
    // 1. Pastikan inisialisasi awal menggunakan fallback 0 jika selectedOrder.fee bernilai null
    const { data, setData, processing, patch, errors } = useForm({
        fee: selectedOrder.fee ?? 0,
        _method: "PATCH",
    });
    const [showWorkOrder, setShowWorkOrder] = useState(false);

    const submitStatus = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const finalFee = (data.fee === null || data.fee === undefined || data.fee === null) ? 0 : Number(data.fee);

        // sinkronkan fee ke form data lalu kirim patch tanpa properti `data` (opsi tidak mengenal field `data`)
        setData("fee", finalFee);
        patch(route("orders.updateStatus", selectedOrder.no), {
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

    console.log("ordereddddd", selectedOrder);
    return (
        <div>
            <section className="fixed inset-0 bg-black/50 overflow-y-auto z-50 justify-center items-center w-full py-10">
                <div className="bg-[#8c8c8c] mx-auto max-w-3xl rounded-3xl p-8 shadow-2xl text-gray-800">
                    <div className="w-full flex justify-end">
                        <X className="w-fit text-white" onClick={onClose} />
                    </div>
                    {/* Header Section */}
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
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-white font-bold mb-1">
                                        Jumlah Pesanan
                                    </label>
                                    <div className="bg-[#d9d9d9] rounded-xl p-3 text-gray-600 text-start">
                                        {selectedOrder.quantity}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-white font-bold mb-1">
                                        Harga Satuan
                                    </label>
                                    <div className="bg-[#d9d9d9] rounded-xl p-3 text-gray-600 text-start">
                                        {selectedOrder.price}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-white font-bold mb-1">
                                    Total Harga
                                </label>
                                <div className="bg-[#d9d9d9] rounded-xl p-3 text-gray-600">
                                    {selectedOrder.total_price}
                                </div>
                            </div>
                        </div>
                        {/* Right Column: Custom Design */}
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
                                <div className="flex flex-col gap-1">
                                    <label className="block text-white font-bold mb-1">
                                        Biaya Custom :
                                    </label>
                                    {selectedOrder.status == "process" ||
                                    selectedOrder.status == "ordered" ? (
                                        <span className="italic bg-[#d9d9d9] rounded-xl p-3">
                                            {selectedOrder.fee || 0}
                                        </span>
                                    ) : null}
                                    {selectedOrder.status !== "pending" ? (
                                        <div className="px-4 py-2 text-black italic bg-[#d9d9d9] rounded-xl">
                                            {selectedOrder.fee
                                                ? formatPrice(selectedOrder.fee)
                                                : "Tidak ada biaya"}
                                        </div>
                                    ) : (
                                        <>
                                            <InputError
                                                message={errors.fee}
                                                className="mt-2"
                                            />
                                            {/* 3. Sinkronisasi input handler */}
                                            <input
                                                type="number"
                                                min={0}
                                                className="bg-[#d9d9d9] rounded-xl p-3 text-gray-600"
                                                placeholder="Masukkan biaya custom"
                                                value={data.fee === 0 ? 0 : data.fee || ""}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setData("fee", val === "" ? 0 : Number(val));
                                                }}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <>Tidak Ada Permintaan khusus</>
                        )}
                    </div>
                    {/* Footer Actions */}
                    <div className="mt-12 flex flex-col items-center gap-4">
                        {selectedOrder.status === "pending" && (
                            <p className="text-white italic text-sm">
                                *Perlu pembayaran
                            </p>
                        )}
                        <div className="flex flex-wrap justify-center gap-6">
                            {(selectedOrder.status === "pending" || selectedOrder.status === "checking") && (
                                <button
                                    className="flex items-center gap-3 bg-[#d9d9d9] hover:bg-gray-200 transition-colors px-8 py-3 rounded-2xl shadow-lg group"
                                    onClick={submitStatus}
                                    disabled={processing}
                                >
                                    <FileText
                                        size={32}
                                        className="text-gray-600"
                                    />
                                    <span className="text-2xl font-medium">
                                        {processing
                                            ? "Mengirim..."
                                            : "Buat Nota"}
                                    </span>
                                </button>
                            )}
                            {(selectedOrder.status_bukti === "approved" && selectedOrder.status !== "checking") && (
                                <button
                                    className="flex items-center gap-3 bg-[#d9d9d9] hover:bg-gray-200 transition-colors px-8 py-3 rounded-2xl shadow-lg group"
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowWorkOrder(true);
                                    }}
                                >
                                    <ClipboardList
                                        size={32}
                                        className="text-gray-600"
                                    />
                                    <span className="text-2xl font-medium">
                                        Buat Order Kerja
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            {/* Modal Work Order */}
            {showWorkOrder && (
                <WorkOrderModals
                    selectedOrder={selectedOrder}
                    onClose={() => setShowWorkOrder(false)}
                />
            )}
        </div>
    );
}
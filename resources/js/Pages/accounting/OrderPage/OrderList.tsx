import AdminLayout from "@/Layouts/AdminLayout";
import { Check, ChevronDown, ChevronUp, Clock8 } from "lucide-react"; // Tambah ChevronUp untuk variasi
import React, { useState } from "react";
import TagihanGenerator from "@/Components/InvoiceGenerator";
import { formatPrice } from "@/utils/Formater";
import { MenuItems } from "@headlessui/react";

export default function OrderList({ orders }: any) {
    const ordersEntries = Object.entries(orders || {});
    console.log(ordersEntries);
    const [selectedOrder, setSelectedOrder] = useState<Record<string, any[]> | null>(null);

    // Simpan ID unik saja untuk menentukan mana yang terbuka
    const [openDetailId, setOpenDetailId] = useState<string | number | null>(null);

    const toggleDetail = (id: string | number) => {
        // Jika ID yang diklik sudah buka, maka tutup (null). Jika belum, buka yang baru.
        setOpenDetailId(openDetailId === id ? null : id);
    };
    console.log("ini oderan masuk di acc", selectedOrder);    
    return (
        <AdminLayout>
            <div className="p-4">
                {/* Navigasi Tab Workplace */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {ordersEntries.length > 0 ? (
                        ordersEntries.map(([key, value]: any) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setSelectedOrder({key, value});
                                    setOpenDetailId(null); // Tutup detail jika ganti workplace
                                }}
                                className={`px-4 py-2 rounded whitespace-nowrap transition ${
                                    selectedOrder?.key === key
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 hover:bg-gray-300"
                                }`}
                            >
                                {key.replace(" ", " ").toUpperCase()}
                            </button>
                        ))
                    ) : (
                        <p>Tidak ada data order.</p>
                    )}
                </div>

                {/* Looping Kartu Order */}
                {selectedOrder &&
                    selectedOrder?.value.map((item: any, index: number) => {
                        const itemId = item.invoice_no || item.no;
                        const isOpen = openDetailId === itemId;
                        return (
                            <div key={itemId || index} className="border rounded-lg bg-white shadow-sm border-gray-200 mb-4 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col mb-4">
                                            <h2 className="font-bold text-xl text-blue-600">
                                                No {item.invoice_no ? "tagihan" : "order"}
                                            </h2>
                                            <span>{itemId}</span>
                                        </div>
                                        
                                        {/* Tombol Toggle */}
                                        <button
                                            onClick={() => toggleDetail(itemId)}
                                            className={`p-2 rounded-full transition ${
                                                isOpen ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                                            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-gray-500 text-sm">Product Name</p>
                                            <p className="font-semibold">{item.product_name || "-"}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm">Total Price</p>
                                            <p className="font-semibold text-green-600">
                                                {formatPrice(item.total_price)} {/* Fallback ke total jika total_price tidak ada */}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm">Status</p>
                                            <div className="flex flex-row items-center gap-2">
                                                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs uppercase font-bold">
                                                    {item.status || "N/A"}
                                                </span>
                                                <strong>
                                                    {item.url_img_tagihan === null || item.status_bukti === null ? (<Clock8 className="bg-yellow-500 text-white p-1 rounded-full" />) : 
                                                     <Check className="bg-green-500 text-white p-1 rounded-full" />}
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Area Detail yang muncul hanya jika isOpen === true */}
                                {isOpen && (
                                    <div className="bg-gray-50 p-6 border-t border-gray-200 animate-in slide-in-from-top duration-300">
                                        <h3 className="font-bold text-lg mb-4 text-gray-700">Detail Lengkap</h3>
                                        <div className="grid grid-cols-2 gap-y-3">
                                            <p><strong>Category:</strong> {item.product_category || "-"}</p>
                                            <p><strong>Update At:</strong> {item.update_at || "-"}</p>
                                            <p><strong>Price Satuan:</strong> {formatPrice(item.price)}</p>
                                            <p><strong>Quantity:</strong> {item.quantity}</p>
                                            <p><strong>ID Internal:</strong> {item.no}</p>
                                        </div>
                                        <TagihanGenerator item={item} onClose={() => toggleDetail(itemId)} />
                                    </div> 
                                )}
                               
                            </div>
                        );
                    })}
            </div>
        </AdminLayout>
    );
}
import { AdminItemCard } from "@/Components/AdminItemCard";
import AdminLayout from "@/Layouts/AdminLayout";
import { OrdersAdminProps } from "@/Types/Orders";
import { ClipboardList, FileText, Image as ImageIcon } from "lucide-react";
import React, { useState } from "react";

export default function OrderList({ orders }: { orders: OrdersAdminProps[] }) {
    const [selectedOrder, setSelectedOrder] = useState<OrdersAdminProps>(null);
    console.log("cekcek", orders);
    
    return (
        <AdminLayout>
            <section className="p-6">
                {orders.map((order) => (
                    <AdminItemCard
                        key={order.order}
                        url_img={`/storage/${order.url_img_product}`}
                        judul={order.name}
                        tgl={order.ordered_by}
                        quantity={order.quantity}
                        status={order.status}
                        onClick={() => setSelectedOrder(order)}
                    />
                ))}
                {selectedOrder && (
                    <section className="fixed inset-0 bg-black/50 overflow-y-auto z-50 justify-center items-center w-full py-10">
                        <form className="bg-[#8c8c8c] mx-auto max-w-3xl rounded-3xl p-8 shadow-2xl text-gray-800" >
                            {/* Header Section */}
                            <div className="flex flex-col md:flex-row gap-6 mb-8">
                                {/* Main Product Image Placeholder */}
                                <div className="w-40 h-40 bg-[#d9d9d9] rounded-lg flex items-center justify-center">
                                    <img
                                        src={`/storage/${selectedOrder.url_img_product}`}
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
                                                {selectedOrder.status}
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
                                            src={`/storage/${selectedOrder.url_img_request}`}
                                            alt="Custom Design "
                                        />
                                        <div>
                                            <label className="block text-white font-bold mb-1">
                                                Biaya Custom :
                                            </label>
                                            <input type="number" className="bg-[#d9d9d9] rounded-xl p-3 text-gray-600">
                                            </input>
                                        </div>
                                    </div>
                                ) : (
                                    <>Tidak Ada Permintaan khusus</>
                                )}
                            </div>
                            {/* Footer Actions */}
                            <div className="mt-12 flex flex-col items-center gap-4">
                                <p className="text-white italic text-sm">
                                    *Perlu pembayaran
                                </p>
                                <div className="flex flex-wrap justify-center gap-6">
                                    {selectedOrder.status === 'ordered' && (
                                    <button className="flex items-center gap-3 bg-[#d9d9d9] hover:bg-gray-200 transition-colors px-8 py-3 rounded-2xl shadow-lg group">
                                        <FileText
                                            size={32}
                                            className="text-gray-600"
                                        />
                                        <span className="text-2xl font-medium">
                                            Buat Nota
                                        </span>
                                    </button>
                                    )}
                                    {selectedOrder.status === 'paid' && (
                                    <button className="flex items-center gap-3 bg-[#d9d9d9] hover:bg-gray-200 transition-colors px-8 py-3 rounded-2xl shadow-lg group">
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
                        </form>
                    </section>
                )}
            </section>
        </AdminLayout>
    );
}
function post(arg0: string, arg1: {}) {
    throw new Error("Function not implemented.");
}


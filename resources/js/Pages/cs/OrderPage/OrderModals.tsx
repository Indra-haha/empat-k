import React from "react";
import { OrdersCSProps } from "@/Types/Orders";
import { ClipboardList, FileText, X } from "lucide-react";
import { useForm } from "@inertiajs/react";

export default function OrderModals({
    selectedOrder,
    onClose,
}: {
    selectedOrder: OrdersCSProps;
    onClose: () => void;
}) {
    const { data, setData, processing, patch, errors } = useForm({
        fee: selectedOrder.fee,
        _method: "PATCH",
    });

    const submitStatus = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        // Ganti 'orders.update' dengan nama route update kamu di Laravel

        if (!data.fee) {
            alert("Biaya custom tidak boleh kosong");
            return;
        }
        patch(route("orders.updateStatus", selectedOrder.no), {
            onSuccess: (page) => {
                // Ambil flash langsung dari object 'page' yang baru saja kembali
                const flash = page.props.flash as any;
                if (flash.success) {
                    alert(flash.success);
                }
                onClose(); // Tutup modal
            },
            onError: (errors) => {
                alert("Terjadi kesalahan sistem");
            },
        });
    };
    console.log(selectedOrder);
    return (
        <section className="fixed inset-0 bg-black/50 overflow-y-auto z-50 justify-center items-center w-full py-10">
            <form className="bg-[#8c8c8c] mx-auto max-w-3xl rounded-3xl p-8 shadow-2xl text-gray-800">
                <div className="w-full flex justify-end">
                    <X className="w-fit text-white" onClick={onClose} />
                </div>
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
                            
                            <div className="flex flex-col gap-3">
                                <label className="block text-white font-bold mb-1">
                                    Biaya Custom : 
                                </label>
                                <span className="italic bg-[#d9d9d9] rounded-xl p-3">{selectedOrder.status == 'process' ? selectedOrder.fee : ""}</span>
                                {errors.fee}
                                {selectedOrder.status === 'process' ? "" : (
                                    <input
                                    type="number"
                                    min={0}
                                    className="bg-[#d9d9d9] rounded-xl p-3 text-gray-600"
                                    placeholder={
                                        selectedOrder.fee
                                            ? selectedOrder.fee.toString()
                                            : "Masukkan biaya custom"
                                    }
                                    value={data.fee}
                                    onChange={(e) =>
                                        setData("fee", Number(e.target.value))
                                    }
                                ></input>
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
                        {selectedOrder.status === "pending" && (
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
                                    {processing ? "Mengirim..." : "Buat Nota" }
                                </span>
                            </button>
                        )}
                        {selectedOrder.status === "paid" && (
                            <button 
                                className="flex items-center gap-3 bg-[#d9d9d9] hover:bg-gray-200 transition-colors px-8 py-3 rounded-2xl shadow-lg group" 
                                onClick={submitStatus}
                                disabled={processing}
                            >      
                                <ClipboardList
                                    size={32}
                                    className="text-gray-600"
                                />
                                <span className="text-2xl font-medium">
                                    {processing ? "Memproses..." : "Buat Order Kerja"}
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </section>
    );
}

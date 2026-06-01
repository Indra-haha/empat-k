import React from "react";
import { createPortal } from "react-dom"; // Jika kamu pakai React Portal

interface WorkOrderDetailProps {
    selectedOrder: any;
    onClose: () => void;
}

export default function WorkOrderDetail({ selectedOrder, onClose }: WorkOrderDetailProps) {
    console.log("Rendering WorkOrderDetail with selectedOrder:", selectedOrder); // Debug: Lihat data yang diterima di modal
    // Jika kamu pakai createPortal agar modalnya nempel langsung ke body:
    return createPortal(
        <div 
            // WAJIB: Pastikan ada 'fixed inset-0 flex items-center justify-center'
            // WAJIB: Berikan z-index super tinggi (z-[9999]) agar tidak tertutup layout Admin
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999] p-4 animate-fade-in"
            onClick={onClose} // Klik di luar modal untuk menutup
        >
            {/* Box Konten Modal */}
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 text-gray-800 transition-all transform scale-100"
                onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat kontennya diklik
            >
                {/* Header Modal */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                        Detail Work Order: {selectedOrder.name}
                    </h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                        &times;
                    </button>
                </div>

                {/* Jeroan Isi Data Kamu */}
                <div className="space-y-3">
                    <p><strong>No Order:</strong> {selectedOrder.no}</p>
                    <p><strong>Status Pengerjaan:</strong> <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-semibold">{selectedOrder.status}</span></p>
                    <p><strong>Jumlah:</strong> {selectedOrder.quantity} pcs</p>
                    
                    {/* Tampilkan data hasil tembakan Axios kamu di bawah ini */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-250 mt-4">
                        <h4 className="font-semibold mb-2 text-blue-600">Spesifikasi Produksi (Dari Database):</h4>
                        <p><strong>Bahan:</strong> {selectedOrder.bahan || "Memuat..."}</p>
                        <p><strong>Ukuran:</strong> {selectedOrder.ukuran || "Memuat..."}</p>
                        <p><strong>Catatan Produksi:</strong> {selectedOrder.notes || "-"}</p>
                    </div>
                </div>
            </div>
        </div>,
        document.body // Pastikan ini pasangannya createPortal
    );
}
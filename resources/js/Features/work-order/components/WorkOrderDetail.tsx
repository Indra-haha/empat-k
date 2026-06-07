import React from "react";
import { createPortal } from "react-dom"; // Jika kamu pakai React Portal
import LaporanModals from "./WorkOrderReport";
import { useForm, usePage } from "@inertiajs/react"; // Pastikan ini ada untuk akses auth

interface WorkOrderDetailProps {
    selectedOrder: any;
    onClose: () => void;
}

export default function WorkOrderDetail({ selectedOrder, onClose }: WorkOrderDetailProps) {
    const [modals, setModals] = React.useState<any>(null);
    console.log("Rendering WorkOrderDetail with selectedOrder:", selectedOrder); // Debug: Lihat data yang diterima di modal
    // Jika kamu pakai createPortal agar modalnya nempel langsung ke body:
    const { auth } = usePage().props as any; // Pastikan ini ada untuk akses auth
    console.log("cek", auth.user.role); // Debug: Lihat role user saat ini
    const { data, setData, patch } = useForm({
        id: "",
        action: "",
    })
    const approveReport = ({ no, status }: { no: string; status: string }) => {
        setData("id", no);
        setData("action", status);

        patch(route("work-orders.reportApproval"), {
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
    }
    return (
        <>
            {createPortal(
                <div
                    // WAJIB: Pastikan ada 'fixed inset-0 flex items-center justify-center'
                    // WAJIB: Berikan z-index super tinggi (z-[9999]) agar tidak tertutup layout Admin
                    className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999] p-4 animate-fade-in overflow-hidden"
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
                                <p><strong>Catatan Finishing:</strong> {selectedOrder.finishing || "-"}</p>
                                {selectedOrder.img_laporan && (
                                    <div className="mt-4 overflow-auto">
                                        <h5 className="font-semibold mb-1">Laporan Gambar:</h5>
                                        <img
                                            src={selectedOrder.img_laporan}
                                            alt="Laporan Gambar"
                                            className="max-w-full h-auto rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        {auth.user.role !== 'cs' ?
                            <div className="flex w-full justify-end gap-3 mt-4">
                                {selectedOrder.status === 'process' || selectedOrder.status === 'checking' ? (
                                    <button onClick={() => setModals(selectedOrder.no)} className="bg-gray-300 text-gray-600 px-3 py-1 rounded">Open Modal</button>
                                ) : null}
                            </div>
                            : (selectedOrder.status === 'checking' || selectedOrder.status === 'rejected') && auth.user.role === 'accounting' ? (
                                <div className="flex w-full justify-between gap-3 mt-4">
                                    <button onClick={() => approveReport({ no: selectedOrder.no, status: 'approved' })} className="bg-gray-300 text-gray-600 px-3 py-1 rounded">Approve</button>
                                    <button onClick={() => approveReport({ no: selectedOrder.no, status: 'rejected' })} className="bg-gray-300 text-gray-600 px-3 py-1 rounded">Reject</button>
                                </div>
                            ) : null}
                    </div>
                </div>,
                document.body
            )}
            {modals && auth.user.role != 'cs' && (
                <LaporanModals selectedOrder={selectedOrder} onClose={() => setModals(null)} />
            )}
        </>
    );
}
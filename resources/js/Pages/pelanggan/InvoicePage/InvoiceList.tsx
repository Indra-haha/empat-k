import React, { useState } from "react";
import { PageWithHeaderBack } from "../Layout/PageWithHeaderBack";
import { Eye, X, ReceiptText, FileText } from "lucide-react";
import { formatPrice } from "@/utils/Formater";
import { useForm } from "@inertiajs/react";

export default function InvoiceList({ nota }: { nota: any[] }) {
    console.log("Invoice Data:", nota);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [selectedImgBukti, setSelectedImgBukti] = useState<string | null>(null,);
    const [openBukti, setOpenBukti] = useState(false);
    const { data, setData, patch, processing, errors } = useForm({
        invoice_no: null as string | null,
        url_img_bukti: null as File | null,
        _method: "PATCH",
    });
    const submitStatus = (e: React.FormEvent) => {
        e.preventDefault();

        const uploadUrl = route("invoice.uploadBukti");

        patch(uploadUrl, {
            forceFormData: true,
            onSuccess: (page) => {
                const flash = page.props.flash as any;
                if (flash?.success) {
                    alert(flash.success);
                }
            },
            onError: (err) => {
                console.error(err);
                alert(
                    "Gagal mengunggah gambar. Pastikan format benar (JPG/PNG).",
                );
            },
        });
    };
    return (
        <PageWithHeaderBack title="Daftar Invoice" route="products">
            <div className="space-y-4 pb-20 min-h-screen">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Semua Invoice ({nota.length})
                </p>

                {nota.length > 0 ? (
                    nota.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                        <ReceiptText size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 leading-none">
                                            {item.invoice_no}
                                        </h3>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Order ID: #{item.order_id}
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                                        item.status === "full_paid"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-orange-100 text-orange-600"
                                    }`}
                                >
                                    {item.status.replace("_", " ")}
                                </span>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold">
                                        Total DP
                                    </p>
                                    <p className="text-lg font-black text-blue-600">
                                        {formatPrice(item.total)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedImg(
                                            `${item.img_tagihan}`,
                                        );
                                        setData({
                                            ...data,
                                            invoice_no: item.invoice_no,
                                        });
                                        {
                                            if (item.img_bukti !== null) {
                                                setSelectedImgBukti(
                                                    `${item.img_bukti}`,
                                                );
                                            }
                                        }
                                    }}
                                    className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold active:scale-95 transition-all shadow-md"
                                >
                                    <Eye size={16} />
                                    Lihat File
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 text-gray-400">
                        <FileText
                            size={48}
                            className="mx-auto mb-2 opacity-20"
                        />
                        <p>Belum ada invoice tersedia</p>
                    </div>
                )}
            </div>

            {/* OVERLAY MODAL (MELAYANG) */}
            {selectedImg && (
                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={() => (
                        setSelectedImg(null),
                        setSelectedImgBukti(null)
                    )}
                >
                    <div
                        className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Modal */}
                        <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                            <span className="font-bold text-gray-700">
                                Preview Invoice
                            </span>
                            <button
                                onClick={() => (
                                    setSelectedImg(null),
                                    setSelectedImgBukti(null)
                                )}
                                className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Image Content */}
                        <div className="flex-1 overflow-auto bg-gray-50 p-2">
                            <img
                                src={selectedImg}
                                alt="Tagihan"
                                className="w-full h-auto rounded-xl shadow-sm"
                            />
                        </div>
                        <div className="flex flex-col w-full gap-4 p-4 border-t bg-white">
                            {selectedImgBukti !== null ? (
                                <button
                                    className="text-center bg-green-600 text-white text-semibold text-md py-3 px-4 rounded-xl"
                                    onClick={() => setOpenBukti(true)}
                                >
                                    Lihat Bukti Pembayaran
                                </button>
                            ) : (
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="border p-2 rounded bg-white"
                                        onChange={(e) =>
                                            setData(
                                                "url_img_bukti",
                                                e.target.files
                                                    ? e.target.files[0]
                                                    : null,
                                            )
                                        }
                                    />
                                    <button
                                        type="button"
                                        disabled={processing}
                                        className={`px-6 py-2 rounded-xl text-white font-bold ${processing ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"}`}
                                        onClick={submitStatus}
                                    >
                                        {processing
                                            ? "Mengirim..."
                                            : "Kirim Bukti Pembayaran"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {selectedImgBukti && openBukti && (
                <div
                    className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={() => setOpenBukti(false)}
                >
                    <div
                        className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Modal */}
                        <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                            <span className="font-bold text-gray-700">
                                Bukti Pembayaran
                            </span>
                            <button
                                onClick={() => setOpenBukti(false)}
                                className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Image Content */}
                        <div className="flex-1 overflow-auto bg-gray-50 p-2">
                            <img
                                src={selectedImgBukti}
                                alt="Bukti Pembayaran"
                                className="w-full h-auto rounded-xl shadow-sm"
                            />
                        </div>
                    </div>
                </div>
            )}
        </PageWithHeaderBack>
    );
}

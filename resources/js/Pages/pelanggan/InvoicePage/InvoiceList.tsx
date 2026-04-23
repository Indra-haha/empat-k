import React, { useState } from "react";
import { PageWithHeaderBack } from "../Layout/PageWithHeaderBack";
import { Eye, X, ReceiptText, FileText } from "lucide-react";
import { formatPrice } from "@/utils/Formater";

export default function InvoiceList({ nota }: { nota: any[] }) {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

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
                                <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                                    item.status === 'full_paid' 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'bg-orange-100 text-orange-600'
                                }`}>
                                    {item.status.replace('_', ' ')}
                                </span>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold">Total DP</p>
                                    <p className="text-lg font-black text-blue-600">
                                        {formatPrice(item.total)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedImg(`/show-invoice?file=${item.img_tagihan}`)}
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
                        <FileText size={48} className="mx-auto mb-2 opacity-20" />
                        <p>Belum ada invoice tersedia</p>
                    </div>
                )}
            </div>

            {/* OVERLAY MODAL (MELAYANG) */}
            {selectedImg && (
                <div 
                    className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={() => setSelectedImg(null)}
                >
                    <div 
                        className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Modal */}
                        <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                            <span className="font-bold text-gray-700">Preview Invoice</span>
                            <button 
                                onClick={() => setSelectedImg(null)}
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

                    </div>
                </div>
            )}
        </PageWithHeaderBack>
    );
}
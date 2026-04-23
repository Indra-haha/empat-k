import React, { useRef } from "react";
import { toBlob } from "html-to-image";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Save, X } from "lucide-react";
import { formatPrice, formatToShortDate } from "@/utils/Formater";
import { useForm, router } from "@inertiajs/react";

const TagihanGenerator = ({
    item,
    onClose,
}: {
    item: any;
    onClose: () => void;
}) => {
    const notaRef = useRef<HTMLDivElement>(null);

    // Tetap gunakan useForm untuk tracking status loading (processing)
    const { processing } = useForm();

    const handleSaveToDatabase = async () => {
        if (notaRef.current === null) return;

        try {
            // 1. GENERATE GAMBAR (PNG)
            const blob = await toBlob(notaRef.current, {
                canvasWidth: 794,
                canvasHeight: 1123,
                backgroundColor: "#ffffff",
                skipFonts: true,
            });

            if (!blob) {
                alert("Gagal membuat gambar tagihan.");
                return;
            }

            // 2. SIAPKAN DATA & FILE
            const dateCode = formatToShortDate(new Date().toISOString());
            const noInvoice = `INV-${dateCode}-${item.no}`;
            const imageFile = new File([blob], `${noInvoice}.png`, { type: "image/png" });

            // 3. UPLOAD LANGSUNG (Logic Backend disk 'private' ada di Laravel)
            // Menggunakan router.post secara langsung untuk bypass state lag
            router.post(route("invoices.store"), {
                invoice_no: noInvoice,
                url_img_tagihan: imageFile,
                order_id: item.no, // Pastikan ini ID yang valid untuk exists:orders
                total_amount: item.total_price * 0.3,
            }, {
                forceFormData: true, // WAJIB untuk kirim File
                onSuccess: () => {
                    alert("Tagihan Berhasil Disimpan!");
                    onClose();
                },
                onError: (errors) => {
                    console.error("Detail Error:", errors);
                    alert("Terjadi kesalahan saat menyimpan data.");
                }
            });
        } catch (err) {
            console.error("Gagal total:", err);
            alert("Gagal memproses tagihan.");
        }
    };

    return (
        <div className="flex flex-col items-center">
            {/* Template Nota */}
            <div
                ref={notaRef}
                className="w-[794px] p-12 bg-white text-slate-800"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                {/* Header Section */}
                <div className="flex justify-between items-start border-b-4 border-blue-600 pb-8">
                    <div className="flex gap-6">
                        <div className="w-20 h-20 flex items-center justify-center">
                            <LazyLoadImage
                                src="/logo.png"
                                alt="Logo"
                                className="object-contain"
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-blue-600 tracking-tighter">EMPAT-K</h1>
                            <p className="text-xs text-slate-500 mt-1 uppercase font-semibold">
                                Percetakan & Alat Tulis Kantor<br />
                                Jl. Mangkuyudan 57 Yogyakarta 55143<br />
                                Telp. (0274) 378733
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className="text-4xl font-black text-slate-200 italic mb-2">TAGIHAN</h2>
                        <p className="text-sm font-bold text-slate-400">
                            Tgl: {formatToShortDate(new Date().toISOString())}
                        </p>
                    </div>
                </div>

                {/* Customer Section */}
                <div className="my-10 grid grid-cols-2 gap-10">
                    <div className="border-l-4 border-blue-600 pl-4">
                        <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Kepada Yth:</p>
                        <p className="text-xl font-bold uppercase">{item.user}</p>
                        <p className="text-sm text-slate-500">Order ID: {item.no}</p>
                    </div>
                    <div className="text-right flex flex-col justify-end text-red-500 italic">
                        <p className="text-sm font-mono font-bold">
                            No Tagihan :<br />
                            <span className="text-2xl underline decoration-double font-black">
                                INV-{formatToShortDate(new Date().toISOString())}-{item.no}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Table Content */}
                <div className="grid grid-cols-12 border-2 border-blue-600 rounded-xl overflow-hidden min-h-[300px]">
                    <div className="col-span-5 p-6 border-r-2 border-blue-600 bg-blue-50/20">
                        <p className="text-[10px] font-black text-blue-600 uppercase mb-4">Produk</p>
                        <p className="text-lg font-bold">{item.product_name}</p>
                        <p className="text-sm italic text-slate-600 mt-2">{item.request || "Sesuai desain"}</p>
                    </div>
                    <div className="col-span-3 p-6 border-r-2 border-blue-600 text-center">
                        <p className="text-[10px] font-black text-blue-600 uppercase mb-4">Harga Satuan</p>
                        <p className="font-bold">{formatPrice(item.price)}</p>
                    </div>
                    <div className="col-span-4 p-6 bg-blue-600 text-white text-right">
                        <p className="text-[10px] font-black text-blue-200 uppercase mb-4">Total Item</p>
                        <p className="text-xl font-black">{formatPrice(item.total_price)}</p>
                        <p className="text-[10px] mt-1">Qty: {item.quantity} pcs</p>
                    </div>
                </div>

                {/* Footer & Summary */}
                <div className="mt-10 grid grid-cols-12 gap-8">
                    <div className="col-span-7 flex justify-around items-end">
                        <div className="text-center">
                            <div className="h-16"></div>
                            <p className="border-t border-slate-300 px-4 text-[10px] font-bold">Hormat Kami</p>
                        </div>
                        <div className="text-center">
                            <div className="h-16"></div>
                            <p className="border-t border-slate-300 px-4 text-[10px] font-bold">({item.user})</p>
                        </div>
                    </div>
                    <div className="col-span-5 bg-slate-50 p-6 rounded-xl space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-400 italic">
                            <span>Total Keseluruhan</span>
                            <span>{formatPrice(item.total_price)}</span>
                        </div>
                        <div className="flex flex-col border-y-2 border-dotted border-red-200 py-2">
                            <span className="text-[10px] font-black text-red-600 uppercase italic">DP (30%)</span>
                            <span className="text-2xl font-black text-red-600">{formatPrice(item.total_price * 0.3)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-slate-800">
                            <span>Sisa Bayar</span>
                            <span>{formatPrice(item.total_price * 0.7)}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-10 text-[9px] text-center text-slate-400 italic border-t pt-4">
                    <p className="font-bold">Transfer BCA 445.055.0936 a/n Heru Budi Setiawan</p>
                    <p>Dokumen ini adalah bukti penagihan sah dari Sistem Digital CV. Empat-K</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6 mt-8">
                <button
                    onClick={handleSaveToDatabase}
                    // disabled={processing}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all disabled:bg-slate-400"
                >
                    <Save className="w-5 h-5" />
                    {processing ? "Memproses..." : "Kirim tagihan"}
                </button>
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-full font-bold transition-all"
                >
                    <X className="w-5 h-5" /> Batalkan
                </button>
            </div>
        </div>
    );
};

export default TagihanGenerator;
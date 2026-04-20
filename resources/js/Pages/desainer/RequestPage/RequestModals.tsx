"use client";

import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useForm } from "@inertiajs/react";

export default function RequestModals({
    selectedRequest,
    onClose,
}: {
    selectedRequest: any;
    onClose: () => void;
}) {
    // 1. Inisialisasi useForm dengan benar
    const { data, setData, patch, processing, errors } = useForm({
        url_img: null as File | null, // Tempat menyimpan file gambar
        _method: "PATCH", // Spoofing method untuk Laravel
    });

    const submitStatus = (e: React.FormEvent) => {
        e.preventDefault();

        // 2. Gunakan post dengan route parameter ID/No
        // Gunakan forceFormData: true agar file biner terkirim
        patch(route("requests.updateGambar", selectedRequest.no), {
            forceFormData: true,
            onSuccess: (page) => {
                const flash = page.props.flash as any;
                if (flash?.success) {
                    alert(flash.success);
                }
                onClose();
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
        <section className="fixed inset-0 bg-black/50 overflow-y-auto z-50 flex justify-center items-start py-10">
            {/* Ganti ke div atau tetap form, tapi pastikan onSubmit di handle di sini */}
            <div className="bg-[#8c8c8c] mx-auto w-full max-w-3xl rounded-3xl p-8 shadow-2xl text-gray-800 flex flex-col gap-3">
                {/* PERBAIKAN: Ganti <head> menjadi <div> */}
                <div className="flex flex-row gap-4 w-full">
                    <div className="flex-shrink-0">
                        <LazyLoadImage
                            src={`/storage/${selectedRequest.upload_image}`}
                            alt="Uploaded Image"
                            className="w-60 h-60 object-cover rounded-lg"
                        />
                    </div>

                    <aside className="flex flex-col flex-1 gap-3 py-3 min-w-0">
                        <header className="flex flex-row gap-3 w-full">
                            <h1 className="flex-shrink-0 w-40 font-bold flex items-center">
                                No Permintaan
                            </h1>
                            <h1 className="flex-1 font-bold px-4 py-2 rounded-xl bg-red-100 flex items-center overflow-hidden">
                                {selectedRequest.no}
                            </h1>
                        </header>

                        <div className="w-full">
                            <span className="flex w-full justify-end px-4 py-2 italic text-sm">
                                Tanggal : {selectedRequest.create}
                            </span>
                            <div className="flex w-full justify-start px-4 py-2 bg-gray-200 rounded-xl truncate">
                                Nama Pelanggan : {selectedRequest.user}
                            </div>
                        </div>

                        <footer className="flex flex-row gap-3 w-full">
                            <div className="flex flex-col flex-1 bg-gray-200 rounded-xl px-4 py-2 gap-2 text-center min-w-0">
                                <h2 className="text-sm text-gray-600">
                                    Nama Produk
                                </h2>
                                <p className="flex-1 flex items-center justify-center font-semibold italic break-all">
                                    "{selectedRequest.product}"
                                </p>
                            </div>
                            <div className="flex flex-col flex-1 bg-gray-200 rounded-xl px-4 py-2 gap-2 text-center min-w-0">
                                <h2 className="text-sm text-gray-600">
                                    Titik Revisi
                                </h2>
                                <p className="flex-1 flex items-center justify-center font-semibold italic break-all">
                                    "{selectedRequest.description?.focus_spot}"
                                </p>
                            </div>
                        </footer>
                    </aside>
                </div>

                <main className="flex flex-row gap-4 w-full">
                    {[
                        {
                            label: "Referensi",
                            val: selectedRequest.description?.reference,
                        },
                        {
                            label: "Gaya Bahasa",
                            val: selectedRequest.description?.style,
                        },
                        {
                            label: "Warna",
                            val: selectedRequest.description?.color,
                        },
                        {
                            label: "Type Font",
                            val: selectedRequest.description?.teks,
                        },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col flex-1 bg-gray-200 rounded-xl min-w-0 overflow-hidden"
                        >
                            <h2 className="text-sm text-gray-600 bg-gray-300 px-4 py-2 text-center">
                                {item.label}
                            </h2>
                            <p className="flex-1 flex items-center justify-center font-semibold italic break-words px-4 py-2 text-center text-sm">
                                "{item.val || "-"}"
                            </p>
                        </div>
                    ))}
                </main>

                <footer className="flex flex-col gap-3 w-full mt-4">
                    <label className="font-bold">Upload Hasil Desain:</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="border p-2 rounded bg-white"
                        onChange={(e) =>
                            setData(
                                "url_img",
                                e.target.files ? e.target.files[0] : null,
                            )
                        }
                    />
                    {/* Tampilkan error validasi jika ada */}
                    {errors.url_img && (
                        <span className="text-red-600 text-sm font-bold">
                            {errors.url_img}
                        </span>
                    )}

                    <div className="flex gap-2 justify-end mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 rounded-xl bg-gray-400 text-white font-bold"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            disabled={processing}
                            className={`px-6 py-2 rounded-xl text-white font-bold ${processing ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"}`}
                            onClick={submitStatus}
                        >
                            {processing ? "Mengirim..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </footer>
            </div>
        </section>
    );
}

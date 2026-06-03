"use client";

import React, { useEffect, useRef, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import { createPortal } from "react-dom";
import { toBlob } from "html-to-image";
import { FileText, CheckCircle, AlertCircle, Clock } from "lucide-react";

/* ================= INPUT ERROR ================= */
function InputError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="text-xs text-red-500 mt-1">{message}</p>;
}

/* ================= FIELD ================= */
function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                {label}
            </label>
            {children}
            <InputError message={error} />
        </div>
    );
}

const inputCls =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

/* ================= CARD (CAPTURE AREA) ================= */
function LaporanCard({ data, selectedOrder }: any) {
    const statusLabel: Record<string, string> = {
        on_track: "On Track",
        at_risk: "At Risk",
        delayed: "Delayed",
        completed: "Completed",
    };

    return (
        <div className="w-[640px] bg-white p-10 font-sans text-gray-900">
            {/* HEADER */}
            <div className="border-b-4 border-indigo-500 pb-4 mb-6">
                <h2 className="text-2xl font-bold text-indigo-900">
                    Laporan Produksi
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    {data.judul_laporan || "-"}
                </p>
            </div>

            {/* ORDER */}
            <div className="flex gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                {selectedOrder?.url_img_product && (
                    <img
                        src={selectedOrder.url_img_product}
                        crossOrigin="anonymous"
                        className="w-14 h-14 rounded-lg object-cover"
                    />
                )}

                <div>
                    <p className="font-semibold">{selectedOrder?.name}</p>
                    <p className="text-xs text-gray-500">
                        #{selectedOrder?.no} • {selectedOrder?.user}
                    </p>
                </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-400">Tanggal</p>
                    <p className="text-sm font-semibold">
                        {data.tanggal_laporan}
                    </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-400">Progress</p>
                    <p className="text-sm font-semibold">{data.progress}</p>
                </div>
            </div>

            {/* CONTENT */}
            <div className="space-y-3 text-sm">
                <p>
                    <span className="font-semibold">Kendala:</span>{" "}
                    {data.kendala}
                </p>
                <p>
                    <span className="font-semibold">Solusi:</span> {data.solusi}
                </p>
                <p>
                    <span className="font-semibold">Keterangan:</span>{" "}
                    {data.keterangan}
                </p>
            </div>

            {/* FOOTER */}
            <div className="mt-6 pt-4 border-t text-xs text-gray-400">
                Generated {new Date().toLocaleDateString("id-ID")}
            </div>
        </div>
    );
}

/* ================= MAIN MODAL ================= */
export default function LaporanModals({ selectedOrder, onClose }: any) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [generating, setGenerating] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        order_id: selectedOrder?.no ?? "",
        tanggal_laporan: new Date().toISOString().split("T")[0],
        progress: "",
        kendala: "",
        solusi: "",
        keterangan: "",
    });

    useEffect(() => {
        if (selectedOrder) {
            setData("order_id", selectedOrder.no);
        }
        return () => reset();
    }, [selectedOrder]);

    /* ================= HANDLE SUBMIT ================= */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!cardRef.current) return;

        setGenerating(true);

        try {
            const blob = await toBlob(cardRef.current, {
                pixelRatio: 2,
                backgroundColor: "#fff",
                skipFonts: true,
            });

            if (!blob) {
                throw new Error("Blob kosong");
            }

            const file = new File([blob], "laporan.png", {
                type: "image/png",
            });

            const formData = new FormData();

            formData.append("_method", "POST");

            // PASTIKAN INI ADA
            formData.append("img_laporan", file);
            formData.append("order_id", data.order_id);
            formData.append("tanggal_laporan", data.tanggal_laporan);
            formData.append("progress", data.progress);
            formData.append("kendala", data.kendala);
            formData.append("solusi", data.solusi);
            formData.append("keterangan", data.keterangan);

            console.log("FILE:", file); // DEBUG
            formData.append("_method", "POST");

            router.post(route("work-orders.store"), formData, {
                forceFormData: true,
            });
        } catch (err) {
            console.error(err);
            alert("Gagal generate gambar");
        } finally {
            setGenerating(false);
        }
    };

    /* ================= UI ================= */
    return createPortal(
        <div
            className="fixed inset-0 flex items-center overflow-y-auto pt-40 justify-center bg-black/60 z-[9999] p-4 animate-fade-in"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            {/* HIDDEN CARD */}
            <div className="fixed -left-[9999px] top-0">
                <div ref={cardRef}>
                    <LaporanCard data={data} selectedOrder={selectedOrder} />
                </div>
            </div>

            {/* MODAL */}
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-2 mb-5">
                    <FileText />
                    <h2 className="font-bold text-lg">Buat Laporan</h2>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <h2>Work Order - {selectedOrder.no}</h2>

                    <Field label="Tanggal">
                        <input
                            type="date"
                            className={inputCls}
                            value={data.tanggal_laporan}
                            onChange={(e) =>
                                setData("tanggal_laporan", e.target.value)
                            }
                        />
                    </Field>

                    <Field label="Progress">
                        <input
                            className={inputCls}
                            value={data.progress}
                            onChange={(e) =>
                                setData("progress", e.target.value)
                            }
                        />
                    </Field>

                    <Field label="Kendala">
                        <textarea
                            className={inputCls}
                            value={data.kendala}
                            onChange={(e) => setData("kendala", e.target.value)}
                        />
                    </Field>

                    <Field label="Solusi">
                        <textarea
                            className={inputCls}
                            value={data.solusi}
                            onChange={(e) => setData("solusi", e.target.value)}
                        />
                    </Field>

                    <Field label="Keterangan">
                        <textarea
                            className={inputCls}
                            value={data.keterangan}
                            onChange={(e) =>
                                setData("keterangan", e.target.value)
                            }
                        />
                    </Field>

                    {/* ACTION */}
                    <div className="flex justify-end gap-2 pt-3 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl border text-gray-600"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            disabled={processing || generating}
                            className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold"
                        >
                            {generating ? "Generating..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body,
    );
}

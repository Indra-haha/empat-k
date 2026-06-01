import React, { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { AdminItemCard } from "@/Components/AdminItemCard";
import OrderModals from "@/Features/order/components/OrderModals";
import { OrdersCSProps, StatusHistory } from "@/Types/Orders";
import WorkOrderDetail from "@/Features/work-order/components/WorkOrderDetail";
import axios from "axios";
import { WorkOrderProps } from "@/Types/WorkOrder";

export default function page({
    workOrders,
}: {
    workOrders: Partial<Record<string, any[]>>;
}) {
    const workOrdersEntries = Object.entries(workOrders);

    const [selectedOrder, setSelectedOrder] = useState<{
        key: string; // 1. MODIFIKASI: Ubah ke string agar sesuai dengan hasil Object.entries()
        value: OrdersCSProps[];
    } | null>(null);

    // Memantau objek dasar workOrders agar render tab pertama stabil
    useEffect(() => {
        if (workOrdersEntries.length > 0 && !selectedOrder) {
            const firstEntry = workOrdersEntries[0];
            setSelectedOrder({
                key: firstEntry[0],
                value: firstEntry[1] as OrdersCSProps[],
            });
        }
    }, [workOrders]); // 2. PERBAIKAN: Gunakan workOrders sebagai dependency, bukan workOrdersEntries

    const [openDetailOrder, setopenDetailOrder] = useState<OrdersCSProps | null>(null);
    const [openDetailWorkOrder, setopenDetailWorkOrder] = useState<WorkOrderProps | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = (order: OrdersCSProps) => {
        const currentStatus = order.status?.toString().trim().toLowerCase();

        if (currentStatus === "process") {
            axios.post(route("work-orders.show"), { 
                order_id: order.no 
            })
            .then((res) => {
                const detailData = res.data.data; 
                console.log("Detail Data:", detailData); 
                console.log(Boolean(detailData));// Debug: Lihat data yang diterima dari server
                if (detailData) {
                    setopenDetailWorkOrder({
                        no: detailData.order_id,
                        name: order.name,
                        quantity: order.quantity,
                        status: detailData.status_pengerjaan,
                        bahan: detailData.bahan || "N/A",
                        ukuran: detailData.ukuran || "N/A",
                        finishing : detailData.finishing,
                    });
                    setShowModal(true);
                }
            })
            .catch((err) => {
                console.error("Detail Error:", err);
                alert("Gagal mengambil data dari server via JSON.");
            });
            
        } else {
            setopenDetailOrder(order);
            setShowModal(true);
        }
    };

    const renderActiveModal = () => {
        if (!showModal || !openDetailOrder) return null;

        const currentStatus = openDetailOrder.status?.toString().trim().toLowerCase();

        if (currentStatus === "process") {
            return (
                <WorkOrderDetail
                    selectedOrder={openDetailWorkOrder}
                    onClose={() => setShowModal(false)}
                />
            );
        }

        return (
            <OrderModals
                selectedOrder={openDetailOrder}
                onClose={() => setShowModal(false)}
            />
        );
    };

    return (
        <AdminLayout>
            <section className="p-6">
                {/* Tab Menu */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {workOrdersEntries.length > 0 ? (
                        workOrdersEntries.map(([key, value]: any) => (
                            <button
                                key={key}
                                onClick={() => {
                                    // 3. PERBAIKAN: Pastikan state terupdate dengan key string yang baru
                                    setSelectedOrder({ key, value: value as OrdersCSProps[] });
                                    setopenDetailOrder(null);
                                }}
                                className={`px-4 py-2 rounded whitespace-nowrap transition ${
                                    selectedOrder?.key === key
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 hover:bg-gray-300"
                                }`}
                            >
                                {key.replace("_", " ").toUpperCase()}
                            </button>
                        ))
                    ) : (
                        <p>Tidak ada data order.</p>
                    )}
                </div>

                {/* List Cards */}
                {selectedOrder &&
                selectedOrder.value &&
                selectedOrder.value.length > 0 ? (
                    selectedOrder.value.map((order, index) => (
                        <AdminItemCard
                            key={order.no || `order-${index}`}
                            url_img={`${order.url_img_product}`}
                            judul={order.name}
                            tgl={order.ordered_by}
                            keterangan={String(order.quantity)}
                            status={order.status}
                            status_bukti_tagihan={order.status_bukti}
                            onClick={() => handleCardClick(order)} 
                        />
                    ))
                ) : (
                    <p>Tidak ada order untuk workplace ini.</p>
                )}

                {/* Render Modal Dinamis */}
                {renderActiveModal()}
            </section>
        </AdminLayout>
    );
}
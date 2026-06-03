import { AdminItemCard } from "@/Components/AdminItemCard";
import AdminLayout from "@/Layouts/AdminLayout";
import { OrdersCSProps, StatusHistory } from "@/Types/Orders";
import React, { useEffect, useState } from "react";
import OrderModals from "@/Features/order/components/OrderModals";

export default function OrderList({
    orders,
}: {
    orders: Partial<Record<StatusHistory, OrdersCSProps>>;
}) {
    const ordersEntries = Object.entries(orders || {});
    console.log(ordersEntries);

    const [selectedOrder, setSelectedOrder] = useState<{
        key: StatusHistory;
        value: OrdersCSProps[];
    } | null>(null);

    useEffect(() => {
        if (ordersEntries.length > 0 && !selectedOrder) {
            const firstEntry = ordersEntries[0];
            setSelectedOrder({
                key: firstEntry[0] as StatusHistory,
                value: firstEntry[1] as unknown as OrdersCSProps[],
            });
        }
    }, [ordersEntries]);

    const [openDetail, setOpenDetail] = useState<OrdersCSProps | null>(null);
    const [showModal, setShowModal] = useState(false);

    return (
        <AdminLayout>
            <section className="p-6">
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {ordersEntries.length > 0 ? (
                        ordersEntries.map(([key, value]: any) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setSelectedOrder({ key, value });
                                    setOpenDetail(null); // Tutup detail jika ganti workplace
                                }}
                                className={`px-4 py-2 rounded whitespace-nowrap transition ${
                                    selectedOrder?.key === key
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 hover:bg-gray-300"
                                }`}
                            >
                                {key.replace(" ", " ").toUpperCase()}
                            </button>
                        ))
                    ) : (
                        <p>Tidak ada data order.</p>
                    )}
                </div>
                {selectedOrder &&
                selectedOrder.value &&
                selectedOrder.value.length > 0 ? (
                    selectedOrder.value.map((order) => (
                        <AdminItemCard
                            key={order.order}
                            url_img={`${order.url_img_product}`}
                            judul={order.name}
                            tgl={order.ordered_by}
                            keterangan={String(order.quantity)}
                            status={order.status}
                            status_bukti_tagihan={order.status_bukti}
                            onClick={() => {
                                setOpenDetail(order);
                                setShowModal(true);
                            }}
                        />
                    ))
                ) : (
                    <p>Tidak ada order untuk workplace ini.</p>
                )}
                {showModal && openDetail && (
                    <OrderModals
                        selectedOrder={openDetail}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </section>
        </AdminLayout>
    );
}

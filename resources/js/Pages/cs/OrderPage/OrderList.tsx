import { AdminItemCard } from "@/Components/AdminItemCard";
import AdminLayout from "@/Layouts/AdminLayout";
import { OrdersCSProps } from "@/Types/Orders";
import React, { useState } from "react";
import OrderModals from "./OrderModals";

export default function OrderList({ orders }: { orders: OrdersCSProps[] }) {
    const [selectedOrder, setSelectedOrder] = useState<OrdersCSProps | null>(
        null,
    );
    const [showModal, setShowModal] = useState(false);
    console.table(orders);
    return (
        <AdminLayout>
            <section className="p-6">
                {orders.map((order) => (
                    <AdminItemCard
                        key={order.order}
                        url_img={`${order.url_img_product}`}
                        judul={order.name}
                        tgl={order.ordered_by}
                        keterangan={String(order.quantity)}
                        status={order.status}
                        status_bukti_tagihan ={order.status_bukti}
                        onClick={() => {
                            setSelectedOrder(order);
                            setShowModal(true);
                        }}
                    />
                ))}
                {selectedOrder && showModal && (
                    <OrderModals
                        selectedOrder={selectedOrder}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </section>
        </AdminLayout>
    );
}

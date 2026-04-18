import { AdminItemCard } from "@/Components/AdminItemCard";
import AdminLayout from "@/Layouts/AdminLayout";
import { OrdersAdminProps } from "@/Types/Orders";
import React, { useState } from "react";
import OrderModals from "./OrderModals";

export default function OrderList({ orders }: { orders: OrdersAdminProps[] }) {
    const [selectedOrder, setSelectedOrder] = useState<OrdersAdminProps | null>(
        null,
    );
    const [showModal, setShowModal] = useState(false);

    return (
        <AdminLayout>
            <section className="p-6">
                {orders.map((order) => (
                    <AdminItemCard
                        key={order.order}
                        url_img={`/storage/${order.url_img_product}`}
                        judul={order.name}
                        tgl={order.ordered_by}
                        quantity={order.quantity}
                        status={order.status}
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

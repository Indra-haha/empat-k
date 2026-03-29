import AdminItemCard from "@/Components/AdminItemCard";
import AdminLayout from "@/Layouts/AdminLayout";
import { OrdersAdminProps } from "@/Types/Orders";
import React from "react";

export default function OrderList({ orders }: { orders: OrdersAdminProps[] }) {
    console.log("cek", orders);
    return (
        <AdminLayout>
            {orders.map((order) => (
                <AdminItemCard
                    url_img={`/storage/${order.url_img}`}
                    judul={order.no}
                    tgl={order.ordered_by}
                    quantity={order.quantity}
                    status={order.status}
                    onClick={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                />
            ))}
        </AdminLayout>
    );
}

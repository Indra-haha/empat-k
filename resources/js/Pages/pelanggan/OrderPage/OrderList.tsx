import React from "react";
import { CustomerLayout } from "@/Layouts/CustomerLayout";
import { OrdersPelangganProps } from "@/Types/Orders";

export default function OrderList({ orders }: { orders?: OrdersPelangganProps[] }) {
    const myOrder = orders;
    console.log(myOrder);
    return (
        <CustomerLayout>
            <ul>
                {myOrder.length > 0 ? myOrder.map((order, index) => (
                    <li key={index}>
                        {order.ordered_by} - {order.quantity} item(s) - Total: {order.total} - Status: {order.status} -nama : {order.product}  -harga: {order.price}
                    </li>
                )) : "Tidak ada riwayat order"}
            </ul>
        </CustomerLayout>
    );
}
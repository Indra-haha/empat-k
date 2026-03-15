import React from "react";
import { CustomerLayout } from "@/Layouts/CustomerLayout";
import { OrdersPelangganProps } from "@/Types/Orders";

export default function Page({ orders }: { orders?: OrdersPelangganProps[] }) {
    const myOrder = orders;
    const sortOrder = 0;
    console.log(myOrder);
    return (
        <CustomerLayout>
            <ul>
                {myOrder.length > 0 ? myOrder.map((order) => (
                    <li key={sortOrder +1}>
                        {order.created_at} - {order.quantity} item(s) - Total: {order.total_price} - Status: {order.status} -nama : {order.name}
                    </li>
                )) : "Tidak ada riwayat order"}
            </ul>
        </CustomerLayout>
    );
}
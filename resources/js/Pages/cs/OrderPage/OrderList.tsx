import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

export default function OrderList({ orders }: { orders: any[] }) {
    return (
        <AdminLayout className="p-4">
            <h1 className="text-2xl font-bold mb-4">Order List</h1>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">No</th>
                        <th className="border p-2">Product</th>
                        <th className="border p-2">Quantity</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Total Price</th>
                        <th className="border p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, idx) => (
                        <tr key={idx} className="border">
                            <td className="p-2 justify-center flex">
                                {idx+1}
                            </td>
                            <td className="border p-2">{order.product}</td>
                            <td className="border p-2">{order.quantity}</td>
                            <td className="border p-2">{order.price}</td>
                            <td className="border p-2">{order.total}</td>
                            <td className="border p-2">{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminLayout>
    );
}
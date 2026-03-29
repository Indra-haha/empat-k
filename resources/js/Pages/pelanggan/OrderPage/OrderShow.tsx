import React from "react";
import { PageWithHeaderBack } from "../Layout/PageWithHeaderBack";
export default function OrderShow({ order }) {
    // console.log("cek order", order);
    return (
        <PageWithHeaderBack title="Order Details">
            <section>
                <img src={`/storage/${order.url}`} alt={order.name} />
                <h1>{order.name}</h1>
                <p>No: {order.no}</p>
                <p>Ordered by: {order.ordered_by}</p>
                <p>Quantity: {order.quantity}</p>
                
                <ul>
                    {order.status_histories.map((history, index) => (
                        <li key={index}>
                            {history.status} - {history.updated_at}
                        </li>
                    ))}
                </ul>
            </section>
        </PageWithHeaderBack>
    );
}

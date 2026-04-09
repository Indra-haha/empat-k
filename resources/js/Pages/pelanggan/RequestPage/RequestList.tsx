import { CustomerLayout } from "@/Layouts/CustomerLayout";
import { RequestProps } from "@/Types/Request";
import React from "react";

export default function RequestList({requests}: {requests: RequestProps[]}) {
    console.log("RequestList component rendered", requests);
    return (
        <CustomerLayout>
            {requests.map((request) => (
                <div key={request.no}>
                    <h3>{request.user}</h3>
                    <p>{request.description.teks}</p>
                    <p>{request.status}</p>
                </div>
            ))}
        </CustomerLayout>
    );
}
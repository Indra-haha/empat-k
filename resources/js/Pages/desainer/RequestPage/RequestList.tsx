import { AdminItemCard } from "@/Components/AdminItemCard";
import AdminLayout from "@/Layouts/AdminLayout";
import { RequestProps } from "@/Types/Request";
import React from "react";

export default function RequestList({requests} : {requests: RequestProps[]}) {
    console.log("RequestList component rendered", requests);
    return (
        <AdminLayout>
            {requests.length > 0 ? 
                requests.map((request) => (
                    <AdminItemCard
                        key={request.no} url_img={request.img_product} judul={String(request.no)} tgl={request.create} quantity={0} status={request.status} onClick={function (): void {
                            throw new Error("Function not implemented.");
                        } }                    />
                )) :
                <p>No requests found.</p>
            }
        </AdminLayout>
    );
}
                   
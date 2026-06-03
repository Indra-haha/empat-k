import { AdminItemCard } from "@/Components/AdminItemCard";
import AdminLayout from "@/Layouts/AdminLayout";
import { RequestProps } from "@/Types/Request";
import React, { useState } from "react";
import RequestModals from "@/Features/desain/components/RequestModals";

export default function RequestList({
    requests,
}: {
    requests: RequestProps[];
}) {
    console.log("RequestList component rendered", requests);
    const [selectedRequest, setSelectedRequest] = useState<RequestProps | null>(
        null,
    );
    const [showModal, setShowModal] = useState(false);

    return (
        <AdminLayout>
            {requests.length > 0 ? (
                requests.map((request) => (
                    <AdminItemCard
                        key={request.no}
                        url_img={request.url_img_product}
                        judul={String(request.no)}
                        tgl={request.create}
                        status={request.status}
                        onClick={() => {
                            setSelectedRequest(request);
                            setShowModal(true);
                        }}
                    />
                ))
            ) : (
                <p>No requests found.</p>
            )}
            {selectedRequest && showModal && (
                <RequestModals
                    selectedRequest={selectedRequest}
                    onClose={() => setShowModal(false)}
                />
            )}
        </AdminLayout>
    );
}

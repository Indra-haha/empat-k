import { CustomerLayout } from "@/Layouts/CustomerLayout";
import { RequestProps } from "@/Types/Request";
import React from "react";
import { Head, Link } from "@inertiajs/react";    

export default function RequestList({requests}: {requests: RequestProps[]}) {
    console.log("RequestList component rendered", requests);
    return (
        <CustomerLayout>
            <Head title="Requests" />
            {requests.map((request) => (
                <Link key={request.no} className="block p-[16px] rounded-lg bg-white mb-4 w-full" href={`/requests/show/${request.no}`}>
                    <header className="grid grid-cols-2 gap-auto mb-[20px]">
                        <div className="flex flex-col items-start">
                            <span className="font-semibold text-md">#CUST-{request.no}</span>
                            <h2 className="text-lg text-gray-500">{request.product}</h2>
                        </div>
                        <span className="font-normal text-sm justify-self-end self-start px-3 py-1 bg-blue-100 rounded-full capitalize">{request.status}</span>
                    </header>
                    <p className="text-sm text-start text-gray-600 mt-2">{request.create}</p>
                </Link>
            ))}
        </CustomerLayout>
    );
}
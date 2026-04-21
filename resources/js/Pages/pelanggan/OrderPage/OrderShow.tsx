import React from "react";
import { PageWithHeaderBack } from "../Layout/PageWithHeaderBack";
import TrackingPoint from "@/Components/TrackingPoint";
import { formatPrice } from "@/utils/Formater";
import { OrdersPelangganDetailProps } from "@/Types/Orders";
import { Head } from "@inertiajs/react";

export default function OrderShow({
    order,
}: {
    order: OrdersPelangganDetailProps;
}) {
    const { total_price, ...rest } = order;
    const data = { ...rest, total: order.total_price };
    console.log("cek order", order);
    return (
        <PageWithHeaderBack title="Order Details" route="orders">
            <Head title="Detail Order" />
            <section className="w-full">
                <header className="text-xl font-bold w-full mb-2 bg-gray-200 py-2 px-3 rounded-full">
                    No: {data.no}
                </header>
                <section className="flex flex-1 justify-end mb-4"><span className="w-fit text-sm px-2 py-1 bg-blue-500 text-white rounded-xl">Pesanan {data.request ? "Khusus" : 'Umum'}</span></section>
                <TrackingPoint statusHistory={data.status_histories} />
                <section className="flex flex-row p-2 w-full border-2 border-gray-300 rounded-lg overflow-hidden">
                    <img
                        className="flex-none h-20 aspect-square object-cover"
                        src={`/storage/${data.url}`}
                        alt={data.name}
                    />
                    <main className="flex flex-col ml-2 w-full">
                        <div className="flex flex-col w-full px-2">
                            <h1 className="text-xl font-semibold">
                                {data.name}
                            </h1>
                            <h2 className="text-sm font-normal">
                                {data.category}
                            </h2>
                        </div>
                        <div className="flex flex-row flex-wrap w-full justify-between mt-2 px-2">
                            <p className="text-sm font-normal text-gray-600">
                                Qty: {data.quantity}
                            </p>
                            <p className="text-sm font-normal text-gray-600">
                                {formatPrice(data.price)}
                            </p>
                        </div>
                    </main>
                </section>
                <footer className="flex flex-col     w-full justify-end mt-4 px-2">
                    <div className="flex flex-row w-full justify-between items-center">
                        <p>SubTotal</p>
                        <p className="text-lg font-bold">
                            {formatPrice(data.total)}
                        </p>
                    </div>
                    {data.request != null ? 
                     <div className="flex flex-row w-full justify-between items-center">
                        <p>Custom</p>
                        <p className="text-lg font-bold">
                            {formatPrice(data.request)}
                        </p>
                    </div> : null}
                   
                </footer>
            </section>
        </PageWithHeaderBack>
    );
}

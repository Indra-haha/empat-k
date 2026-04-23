import React from "react";
import { CustomerLayout } from "@/Layouts/CustomerLayout";
import { OrdersPelangganProps } from "@/Types/Orders";
import { Head, Link, useRemember } from "@inertiajs/react";

export default function OrderList({
    orders,
}: {
    orders?: OrdersPelangganProps[];
}) {
    const initialData = orders ? Object.values(orders) : [];
    
    const [data] = useRemember(initialData, "orders");

    console.log(data);
    return (
        <CustomerLayout>
            <Head title="Order"/>
            {data && data.length > 0
                ? data.map((order, index) => (
                      <section
                          key={index}
                          className="flex flex-row w-full p-2 bg-green-200 rounded-lg mb-2"
                      >
                          <img
                              src={`/storage/${order.url}`}
                              alt={order.name}
                              className="h-16 my-auto aspect-square text-[10px] rounded-lg object-cover"
                          />
                          <article className="flex flex-col mx-4 w-full">
                              <h1 className="text-lg font-bold text-black">
                                  {order.name}
                              </h1>
                              <p className="text-sm text-gray-600 mb-3">
                                  Quantiy : {order.quantity}
                              </p>
                              <span className="text-sm italic">
                                  ordered by: {order.ordered_by}
                              </span>
                          </article>
                          <aside className="flex flex-col justify-end">
                              <Link
                                  className="text-sm py-1 px-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
                                  href={`/order/${order.no}`}
                              >
                                  Detail
                              </Link>
                          </aside>
                      </section>
                  ))
                : "Tidak ada riwayat order"}
        </CustomerLayout>
    );
}

import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PageWithHeaderBack } from "../Layout/PageWithHeaderBack";
import { Inertia } from "@inertiajs/inertia";

export default function FormBuying({ product, requests }) {
    const { data, setData, post } = useForm({
        product_id: product.product_id,
        request_id: "",
    });

    const [useRequest, setUseRequest] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        Inertia.post(`/product/${product.product_id}/buyout`, {
            use_request: useRequest ? requests : null,
        });
    };

    console.log(requests);

    return (
        <PageWithHeaderBack title="Buying">
            <form onSubmit={submit} className="flex flex-col gap-4">
                <section className="w-full h-20 flex flex-row gap-4">
                    <LazyLoadImage
                        src={product.image_url}
                        alt={product.name}
                        className="border-2 border-gray-300"
                    />
                    <main className="flex flex-col gap-1 h-full justify-between py-3">
                        <h1 className="text-lg font-bold">{product.name}</h1>
                        <h2 className="text-md text-gray-600">
                            {product.category.name}
                        </h2>
                    </main>
                </section>
            </form>

            {requests ? (
                <section className="my-3 w-full border-2 border-gray-200">
                    <h1 className="text-[14px] font-bold w-full text-end mb-2">
                        Add your custom design
                    </h1>

                    <label className="inline-flex items-end h-auto flex flex-col w-full">
                        <input
                            type="checkbox"
                            checked={useRequest}
                            onChange={() => setUseRequest(!useRequest)}
                            className="hidden"
                        />
                        <LazyLoadImage
                            src={requests}
                            alt="Request"
                            className={`h-20 border-2 border-gray-300 rounded-2xl ${useRequest ? 'ring-2 ring-blue-500' : ''}`}
                        />
                        {useRequest ? <span className="text-sm text-blue-500">Using request</span> : <span className="text-sm text-gray-500">Not using request</span>}
                    </label>
                </section>
            ) : null}
            <label className="mb-2">Harga: {product.price}</label>
            {/* <InputLabel
                htmlFor={`${id}->jumlah`}
                value="Jumlah"
                children={undefined}
            />

            <TextInput
                id={`${id}-jumlah`}
                type="text"
                name="jumlah"
                value={data.jumlah}
                className="mt-1 block w-full"
                autoComplete="jumlah"
                isFocused={true}
                onChange={(e) => setData("jumlah", e.target.value)}
            />   */}

            <button
                onClick={submit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Konfirmasi Pembelian
            </button>
        </PageWithHeaderBack>
    );
}

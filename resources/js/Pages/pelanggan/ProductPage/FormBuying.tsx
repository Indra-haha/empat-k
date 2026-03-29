import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PageWithHeaderBack } from "../Layout/PageWithHeaderBack";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

export default function FormBuying({ product, requests, user }) {
    const [useRequest, setUseRequest] = useState(false);

    useEffect(() => {
        setData("request_id", useRequest ? requests.request_id : null);
    }, [useRequest, requests.request_id]);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: product.product_id,
        request_id: useRequest ? requests.request_id : null,
        user_id: user,
        quantity: 0,
        price: product.price,
        total_price: 0,
    });

    // console.log(user);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/product/buyout`, {});
    };

    // console.log(data);

    return (
        <PageWithHeaderBack title="Buying">
            <form onSubmit={submit} className="flex flex-col gap-4">
                <section className="w-full h-20 flex flex-row gap-4">
                    <LazyLoadImage
                        src={product.url_img}
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
                                className={`h-20 border-2 border-gray-300 rounded-2xl ${useRequest ? "ring-2 ring-blue-500" : ""}`}
                            />
                            {useRequest ? (
                                <span className="text-sm text-blue-500">
                                    Using request
                                </span>
                            ) : (
                                <span className="text-sm text-gray-500">
                                    Not using request
                                </span>
                            )}
                        </label>
                    </section>
                ) : null}
                <label className="mb-2">Harga: {product.price}</label>
                <label className="mb-2">
                    Jumlah
                    <input
                        id="quantity"
                        type="number"
                        name="quantity"
                        value={data.quantity}
                        onChange={(e) => {
                            const quantity = Number(e.target.value);
                            setData("quantity", quantity);
                            setData("total_price", quantity * product.price);
                        }}
                        className="ml-2 border-2 border-gray-300 rounded-md px-2 py-1 w-20"
                        required
                    />
                </label>
                <InputError message={errors.quantity} className="mt-2" />
                <label className="mb-2">Total Harga: {data.total_price}</label>

                <PrimaryButton
                    className="w-full justify-center rounded-md py-2 my-2"
                    disabled={processing}
                >
                    Buy Now
                </PrimaryButton>
            </form>
        </PageWithHeaderBack>
    );
}

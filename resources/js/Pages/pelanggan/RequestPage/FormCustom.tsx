import React from "react";
import { PageWithHeaderBack } from "../Layout/PageWithHeaderBack";
import { LazyLoadImage } from "react-lazy-load-image-component";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { ProductsProps } from "@/Types/Products";
import InputError from "@/Components/InputError";

export default function FormCustom({ product }: { product: ProductsProps }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: product.product_id,
        description: {
            titik_fokus_revisi: "",
            referensi_virtual: "",
            gaya_desain: "",
            warna_dominan: "",
            teks_font: "",
        },
        // Add your custom form fields here
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/product/customReq`);
    };
    console.log(data);
    return (
        <PageWithHeaderBack title="Custom Produk" route="products">
            <Head title="Custom Product" />
            <section className="text-green-800">
                <main className="flex flex-row gap-4 w-[300px]">
                    <LazyLoadImage
                        src={product.url_img}
                        alt={product.name}
                        width={120}
                        height={120}
                        className="object-cover"
                    />
                    <article>
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                    </article>
                </main>
                <form onSubmit={submit} className="my-5 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">      
                        <h2 className="flex flex-row gap-2">
                            <InputLabel
                                htmlFor="Titik Fokus Revisi"
                                value="Titik Fokus Revisi"
                                children={undefined}
                            />
                            <InputError message={errors["description.titik_fokus_revisi"]} />
                        </h2>
                        <TextInput
                            id={`titik_fokus_revisi`}
                            type="text"
                            name="titik_fokus_revisi"
                            value={data.description.titik_fokus_revisi}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("description", {
                                    ...data.description,
                                    titik_fokus_revisi: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="flex flex-row gap-2">
                            <InputLabel
                                htmlFor="Referensi Virtual"
                                value="Referensi Virtual"
                                children={undefined}
                            />
                            <InputError message={errors["description.referensi_virtual"]} />
                        </h2>
                        <TextInput
                            id={`referensi_virtual`}
                            type="text"
                            name="referensi_virtual"
                            value={data.description.referensi_virtual}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("description", {
                                    ...data.description,
                                    referensi_virtual: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="flex flex-row gap-2">
                            <InputLabel
                                htmlFor="Gaya Desain"
                                value="Gaya Desain"
                                children={undefined}
                            />
                            <InputError message={errors["description.gaya_desain"]} />
                        </h2>
                        <TextInput
                            id={`gaya_desain`}
                            type="text"
                            name="gaya_desain"
                            value={data.description.gaya_desain}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("description", {
                                    ...data.description,
                                    gaya_desain: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="flex flex-row gap-2">
                            <InputLabel
                                htmlFor="Warna Dominan"
                                value="Warna Dominan"
                                children={undefined}
                            />
                            <InputError message={errors["description.warna_dominan"]} />
                        </h2>
                        <TextInput
                            id={`warna_dominan`}
                            type="text"
                            name="warna_dominan"
                            value={data.description.warna_dominan}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("description", {
                                    ...data.description,
                                    warna_dominan: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="flex flex-row gap-2">
                            <InputLabel
                                htmlFor="Teks Font"
                                value="Teks Font"
                                children={undefined}
                            />
                            <InputError message={errors["description.teks_font"]} />
                        </h2>
                        <TextInput
                            id={`teks_font`}
                            type="text"
                            name="teks_font"
                            value={data.description.teks_font}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("description", {
                                    ...data.description,
                                    teks_font: e.target.value,
                                })
                            }
                        />
                    </div>
                    <PrimaryButton
                        className="w-full justify-center rounded-md py-2 my-2"
                        disabled={processing}
                    >
                        Ajukan
                    </PrimaryButton>
                </form>
            </section>

            {/* Add your custom form fields here */}
        </PageWithHeaderBack>
    );
}

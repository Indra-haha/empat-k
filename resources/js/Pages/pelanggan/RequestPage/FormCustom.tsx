import React from "react";
import { PageWithHeaderBack } from "../Layout/PageWithHeaderBack";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function FormCustom({ product }) {
    return (
        <PageWithHeaderBack title="Custom Produk">
            <section className="border-2 border-gray-300 flex flex-row gap-4 w-[300px]">
                <LazyLoadImage
                    src={`/storage/${product.url_img}`}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="object-cover"
                />
                <article>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                </article>
            </section>

            {/* Add your custom form fields here */}
        </PageWithHeaderBack>
    );
}

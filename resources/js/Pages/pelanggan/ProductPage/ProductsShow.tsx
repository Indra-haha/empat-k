import { PageWithHeaderBack } from "../Layout/PageWithHeaderBack";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from '@inertiajs/react';
import React from "react";

export default function ProductsShow({ product }) {
    return (
        <PageWithHeaderBack title="Detail">
            <section className="w-full h-full flex flex-col rounded-xl border-2 border-gray-300 overflow-hidden text-green-800">
                <LazyLoadImage
                    className="flex items-center h-full border-b-2 border-gray-300 justify-center w-full h-full [font-family:'Inter-Italic',Helvetica] font-normal italic text-black text-base text-center tracking-[0] leading-[normal] whitespace-nowrap"
                    src={product?.image_url}
                    alt={product.name}
                />
                <main className="inline-flex flex-col items-start justify-center gap-2 relative py-6 px-3">
                    <h1 className="relative flex items-center justify-center w-fit text-xl font-bold whitespace-nowrap">
                        {product.name}
                    </h1>

                    <h2 className="relative flex items-center justify-center w-fit text-sm font-normal whitespace-nowrap">
                        {product.category.name}
                    </h2>
                </main>

                <footer className="flex w-full h-fit relative flex-wrap items-start gap-[10px_10px] px-3 pb-4">
                    <span className="relative w-[293px] h-20 ">
                        <div className="h-[19px] flex items-start justify-start font- text-sm whitespace-nowrap">
                            {product.description}
                        </div>
                    </span>
                    <span className="flex flex-row gap-4 w-full justify-end">
                        <Link className="py-2 px-4 bg-gray-300 text-black rounded-md">Custom</Link>
                        <Link href={`/product/${product.product_id}/instant-buying`} className="py-2 px-4 bg-blue-500 text-white rounded-md">Beli</Link>
                    </span>
                </footer>
            </section>
        </PageWithHeaderBack>
    );
}

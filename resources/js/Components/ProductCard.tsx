"use client";
import React, { JSX } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ProductsProps } from "@/Types/Products";
import { Link } from "@inertiajs/react";
export const ProductCard = (product: ProductsProps): JSX.Element => {
    return (
        <Link
            href={`/product/${product.product_id}`}
            className="flex flex-col w-full h-full items-center justify-between relative bg-green-200 rounded-lg overflow-hidden gap-2"
        >
            <LazyLoadImage
                src={`/storage/${product.url_img}`}
                alt={product.name}
                width={200}
                height={100}
                className="object-cover aspect-square"
            />
            <main className="w-full py-2 flex flex-col items-center justify-center relative text-green-800">
                <h1 className="relative flex items-center w-fit font-semibold text-sm tracking-[0] leading-[normal]">
                    {product.name}
                </h1>
            </main>
        </Link>
    );
};

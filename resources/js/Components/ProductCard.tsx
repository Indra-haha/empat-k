import React, { JSX } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ProductWithCategoryProps } from "@/Types/Products";
import { Link } from "@inertiajs/react";
export const ProductCard = (product: ProductWithCategoryProps): JSX.Element => {
    return (
        <Link href={`product/${product.product_id}`} className="flex flex-col w-full h-[190px] items-center justify-between relative bg-green-200 rounded-[10px] overflow-hidden">
            <LazyLoadImage
                src={product?.image_url}
                alt={product.name}
                width={150}
                height={150}
                className="object-cover border-b-2 border-green-300"
            />
            <main className="w-full py-2 flex flex-col items-center justify-center relative text-green-800">
                <h1 className="relative flex items-center w-fit font-semibold text-sm tracking-[0] leading-[normal]">
                    {product.name}
                </h1>

                <span className="relative flex items-center w-fit font-normal text-xs tracking-[0] leading-[normal]">
                    {product.category.name}
                </span>
            </main>
        </Link>
    );
};

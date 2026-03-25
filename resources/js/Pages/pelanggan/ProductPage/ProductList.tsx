import { ProductCard } from "@/Components/ProductCard";
import { CustomerLayout } from "@/Layouts/CustomerLayout";
import { ProductsProps } from "@/Types/Products";
import { useRemember } from "@inertiajs/react";
import React from "react";

export default function ProductList({ products }: { products: ProductsProps[] }) {
    const [data, setData] = useRemember(products, "products");

    return (
        <CustomerLayout>
            {data && data.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                    {data.map((product) => (
                        <ProductCard
                            category={{
                                name: ""
                            }} key={product.product_id}
                            {...product}                        />
                    ))}
                </div>
            ) : (
                <p>No products available.</p>
            )}
        </CustomerLayout>
    );
}

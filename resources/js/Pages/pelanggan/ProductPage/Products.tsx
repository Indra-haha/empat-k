import { ProductCard } from "@/Components/ProductCard";
import { CustomerLayout } from "@/Layouts/CustomerLayout";
import { ProductsProps } from "@/Types/Products";
import React from "react";
export default function Products({ products }: { products: ProductsProps[] }) {
    console.log(products);
    return (
        <CustomerLayout>
            {products && products.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                    {products.map((product) => (
                        <ProductCard category={{
                            name: "Apapun"
                        }} key={product.product_id} {...product} />
                    ))}
                </div>
            ) : (
                <p>No products available.</p>
            )}
        </CustomerLayout>
    );
}

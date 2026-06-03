"use client";
import { ProductCard } from "@/Components/ProductCard";
import { CustomerLayout } from "@/Layouts/CustomerLayout";
import { filterProducts } from "@/utils/FilterProduct";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Head } from "@inertiajs/react";

export default function ProductList({
    products,
}: {
    products: Record<string, any[]>;
}) {
    const [search, setSearch] = useState("");
    
    const data = products ?? {};

    const filteredProducts = useMemo(
        () => filterProducts(data, search),
        [search],
    );

    return (
        <CustomerLayout>
            <Head title="Products" />
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 w-full mb-4"
            />

            {Object.keys(filteredProducts).length > 0 ? (
                Object.entries(filteredProducts).map(([category, items]) => (
                    <motion.div key={category} className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <h2 className="font-bold mb-2">{category}</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {items.map((product, index) => (
                                <ProductCard key={index} {...product} />
                            ))}
                        </div>
                    </motion.div>
                ))
            ) : (
                <p>No products available.</p>
            )}
        </CustomerLayout>
    );
}

import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Inertia } from "@inertiajs/inertia";
import { ProductsProps } from "@/Types/Products";

export default function Products({ products }: { products?: ProductsProps[] }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductsProps | null>(null);

    // State untuk form
    const [form, setForm] = useState({
        name: "",
        price: "",
    });

    // Handle change form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle submit Add
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post("/products/add", form, {
            onSuccess: () => setShowAddModal(false),
        });
    };

    // Handle submit Edit
    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct) return;
        Inertia.put(`/products/edit/${selectedProduct.product_id}`, form, {
            onSuccess: () => {
                setShowEditModal(false);
                setSelectedProduct(null);
            },
        });
    };

    // Handle Delete
    const handleDelete = (productId: number) => {
        if (!confirm("Are you sure?")) return;
        Inertia.delete(`/products/delete/${productId}`);
    };

    // Open Edit Modal
    const openEditModal = (product: any) => {
        setSelectedProduct(product);
        setForm({ name: product.name, price: product.price });
        setShowEditModal(true);
    };

    return (
        <AdminLayout>
            <section className="p-6">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
                    onClick={() => setShowAddModal(true)}
                >
                    Add Product
                </button>

                <table className="w-full border">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2">ID</th>
                            <th className="p-2 justify-start">Name</th>
                            <th className="p-2 justify-start">Description</th>
                            <th className="p-2 justify-start">Price</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr key={product.product_id} className="border-b">
                                <td className="p-2 justify-center flex">{product.product_id}</td>
                                <td className="p-2">{product.name}</td>
                                <td className="p-2">{product.description}</td>
                                <td className="p-2">{product.price}</td>
                                <td className="p-2 flex gap-2">
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                        onClick={() => openEditModal(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleDelete(product.product_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Add Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded shadow w-96">
                            <h2 className="text-xl font-bold mb-4">Add Product</h2>
                            <form onSubmit={handleAdd} className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="border p-2 rounded"
                                    required
                                />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={form.price}
                                    onChange={handleChange}
                                    className="border p-2 rounded"
                                    required
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        className="px-4 py-2 rounded bg-gray-300"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded bg-blue-600 text-white"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {showEditModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded shadow w-96">
                            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                            <form onSubmit={handleEdit} className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="border p-2 rounded"
                                    required
                                />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={form.price}
                                    onChange={handleChange}
                                    className="border p-2 rounded"
                                    required
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        className="px-4 py-2 rounded bg-gray-300"
                                        onClick={() => setShowEditModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded bg-green-500 text-white"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </AdminLayout>
    );
}
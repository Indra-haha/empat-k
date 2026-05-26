import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ProductsProps } from "@/Types/Products";

export default function ProductList({
    products,
}: {
    products?: ProductsProps[];
}) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductsProps | null>(null);

    // State untuk form
    const { data, setData, post, patch, delete: destroy, processing, errors, reset } = useForm({
        name: "",
        price: "",
        description: "",
        url_img: null as File | null,
        category_id: 0,
    });

    // Handle change form
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // Langsung masukkan ke state 'data' milik useForm
            setData("url_img", e.target.files[0]);
        }
    };
    // Handle submit Add
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        post("/products/add", {
            forceFormData: true, // Wajib agar file terkirim
            onSuccess: (page) => {
                const flash = page.props.flash as any;
                if (flash?.success) {
                    alert(flash.success);
                }
                reset();
                setShowAddModal(false);
            },
            onError: (err) => {
                console.error(err);
                alert(
                    "Gagal mengunggah gambar. Pastikan format benar (JPG/PNG).",
                );
            },
        });
    };

    // Handle submit Edit
    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct) return;
        patch(`/products/edit/${selectedProduct.product_id}`, {
            onSuccess: (page) => {
                const flash = page.props.flash as any;
                if (flash?.success) {
                    alert(flash.success);
                }
                setShowEditModal(false);
                setSelectedProduct(null);
            },
            onError: (err) => {
                console.error(err);
                alert("Gagal memperbarui produk.");
            }
        });
    };

    // Handle Delete
    const handleDelete = (productId: number) => {
        if (!confirm("Are you sure?")) return;
        destroy(`/products/delete/${productId}`);
    };

    // Open Edit Modal
    const openEditModal = (product: any) => {
        setSelectedProduct(product);
        setData({
            name: product.name,
            price: product.price,
            description: product.description,
            url_img: product.url_img,
            category_id: product.category_id,
        });
        setShowEditModal(true);
    };
    console.log("products:", products);
    console.log("type:", typeof products);

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
                        <tr className="border-b w-full">
                            <th className="p-2">No</th>
                            <th className="p-2 text-start">Name</th>
                            <th className="p-2 text-start">Description</th>
                            <th className="p-2 text-start">Price</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(products ?? {})
                            .flat()
                            .map((product, idx) => (
                                <tr key={idx + 1} className="border-b">
                                    <td className="p-2 justify-center flex">
                                        {idx + 1}
                                    </td>
                                    <td className="p-2">{product.name}</td>
                                    <td className="p-2">
                                        {product.description}
                                    </td>
                                    <td className="p-2">{product.price}</td>
                                    <td className="p-2 flex gap-2 justify-center">
                                        <button
                                            className="bg-green-500 text-white px-2 py-1 rounded"
                                            onClick={() =>
                                                openEditModal(product)
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() =>
                                                handleDelete(product.product_id)
                                            }
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
                            <h2 className="text-xl font-bold mb-4">
                                Add Product
                            </h2>
                            <form
                                onSubmit={handleAdd}
                                className="flex flex-col gap-3"
                            >
                                {/* Category */}
                                <select
                                    name="category_id"
                                    value={data.category_id}
                                    onChange={handleChange}
                                    className="border p-2 rounded"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {Object.keys(products ?? {}).map(
                                        (category, idx) => (
                                            <option key={idx} value={category}>
                                                {category}
                                            </option>
                                        ),
                                    )}
                                </select>

                                {/* Name */}
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={data.name}
                                    onChange={handleChange}
                                    className="border p-2 rounded"
                                    required
                                />

                                {/* Price */}
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={data.price}
                                    onChange={handleChange}
                                    className="border p-2 rounded"
                                    required
                                />

                                {/* Description */}
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={data.description}
                                    onChange={handleChange}
                                    className="border p-2 rounded"
                                    rows={3}
                                />

                                {/* Image URL */}
                                <input
                                    type="file"
                                    name="url_img"
                                    placeholder="Image URL"
                                    onChange={handleFileChange}
                                    className="border p-2 rounded"
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
                            <h2 className="text-xl font-bold mb-4">
                                Edit Product
                            </h2>
                            <form
                                onSubmit={handleEdit}
                                className="flex flex-col gap-3"
                            >
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={data.name}
                                    onChange={handleChange}
                                    className="border p-2 rounded"
                                    required
                                />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={data.price}
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


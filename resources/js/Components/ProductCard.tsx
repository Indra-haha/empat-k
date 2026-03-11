import React from "react";
export function ProductCard() {
    return (
        <div className="w-full h-48 bg-gray-200 rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Product Name</h2>
            <p className="text-gray-600 mb-4">This is a brief description of the product.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Details
            </button>
        </div>
    );
}
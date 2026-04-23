"use client";
export const filterProducts = (data: Record<string, any[]>, search: string) => {
    if (!search) return data;
    console.log(data, "ini data filter");
    return Object.entries(data).reduce(
        (acc, [category, items]) => {
            const categoryMatch = category
                .toLowerCase()
                .includes(search.toLowerCase());

            const filteredItems = items.filter((p) => {
                const name = p?.name?.toLowerCase() || "";
                return name.includes(search.toLowerCase());
            });

            // kalau category cocok → ambil semua item
            if (categoryMatch) {
                acc[category] = items;
                return acc;
            }

            // kalau item cocok → ambil hasil filter
            if (filteredItems.length) {
                acc[category] = filteredItems;
            }

            return acc;
        },
        {} as Record<string, any[]>,
    );
};

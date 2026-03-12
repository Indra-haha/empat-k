export type ProductsProps = {
    product_id: number;
    name: string;
    price: number;
    description: string;
    image_url: string;
    category_id: string;
}

export type ProductWithCategoryProps = ProductsProps & {
    category: {
        name: string;
    }
}
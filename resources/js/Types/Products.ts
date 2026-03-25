export type ProductsProps = {
    product_id: number;
    name: string;
    price: number;
    description: string;
    url_img: string;
    category_id: string;
}

export type ProductWithCategoryProps = ProductsProps & {
    category: {
        name: string;
    }
}
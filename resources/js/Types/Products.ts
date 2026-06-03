
export type ProductsProps = {
    product_id: number;
    name: string;
    price: number;
    description: string;
    url_img: string;
    category: string;
}


export type ProductWithCategoryProps = {
    category : string;
    products : ProductsProps[];
}
import { ProductsProps } from "./Products";

export interface descriptionRequest {
    teks: string;
    style: string;
    color: string;
    reference: string;
    focus_spot: string;
}
export interface RequestProps extends ProductsProps {
    url_img_product: string;
    no: number;
    user: string;
    upload_image: string;
    description_request: descriptionRequest;
    status: string; 
    fee: number;  
    create: string;  
    category: string;             
}
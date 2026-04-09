
export interface descriptionRequest {
    teks: string;
    style: string;
    color: string;
    reference: string;
    focus_spot: string;
}
export interface RequestProps {
    no: number;
    user: string;
    upload_image: string;
    img_product: string;
    description: descriptionRequest;
    status: string; 
    fee: number;  
    create: string;               
}
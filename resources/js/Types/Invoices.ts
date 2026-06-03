export interface invoiceProps{
    no : string;
    invoice_no : string;
    product_name : string;
    product_category : string;
    price : number; 
    quantity : number;
    total : number;
    status : string;
    url_img : string;   
    update_at : Date;
}
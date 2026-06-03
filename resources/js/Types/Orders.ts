export type StatusHistory = 'pending' | 'ordered' | 'un_paid' | 'partial_paid' | 'process' | 'checking' | 'finished' | 'full_paid' | 'shipping';
export interface OrdersPelangganProps {
    no : number;
    name : string;
    user: string;
    quantity: number;
    url : string;
    price: number;
    request: number;
    total_price: number;
    status: StatusHistory;
    ordered_by: string;
};

export type OrdersPelangganDetailProps = OrdersPelangganProps & {
    category: string;
    status_histories: {
        status: StatusHistory;
        created_at: string;
    };    
};

export interface OrdersCSProps {
    no : number;
    name: string;
    order: number;
    request: number;
    user: string;
    phone: string;
    url_img_product: string;
    url_img_request: string;
    quantity: number;
    fee: number;
    price: number;
    total_price: number;
    status: string;
    ordered_by: string;
    status_bukti: string | null;
};

export interface OrdersAccountingProps {
    no : number;
    name: string;
    order: number;
}
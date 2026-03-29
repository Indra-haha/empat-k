import { ReactNode } from "react";

export interface OrdersPelangganProps {
    no : number;
    name : string;
    user: string;
    quantity: number;
    url : string;
    price: number;
    total: number;
    status: string;
    ordered_by: string;
};

export interface OrdersAdminProps {
    order: number;
    no: string;
    user: string;
    url_img: string;
    quantity: number;
    price: number;
    total_price: number;
    status: string;
    ordered_by: string;
};
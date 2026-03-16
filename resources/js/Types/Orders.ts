import { ReactNode } from "react";

export interface OrdersPelangganProps {
    product : ReactNode;
    user: ReactNode;
    quantity: number;
    total: number;
    status: string;
    ordered_by: string;
};
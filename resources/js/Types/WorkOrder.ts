import { OrdersCSProps } from "./Orders";

export interface WorkOrderProps extends OrdersCSProps {
    no: number,
    name: string,
    quantity: number,
    status_pengerjaan: string,
    bahan: string,
    ukuran: string,
    finishing: string, 
    img_laporan: string | null,
}
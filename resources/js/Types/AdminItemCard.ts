export interface AdminItemCardProps {
    url_img: string;
    judul: string;
    tgl : string;
    keterangan? : string;
    status : string;
    onClick : () => void;
    status_bukti_tagihan?: string | null;
}
export function formatPrice(price: number) {
    if (price === null || price === undefined) return ;
    return Number(price).toLocaleString('id-ID', {
        style: 'currency', currency: 'IDR' 
    });
}

export const formatToShortDate = (dateString: string): string => {
    const date = new Date(dateString);

    // Cek jika tanggal tidak valid
    if (isNaN(date.getTime())) return "000000";

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 karena Januari = 0
    const year = String(date.getFullYear()).slice(-2); // Ambil 2 angka terakhir

    return `${day}${month}${year}`;
};


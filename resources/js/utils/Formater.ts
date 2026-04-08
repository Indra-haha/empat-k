export function formatPrice(price) {
    if (price === null || price === undefined) return ;
    return Number(price).toLocaleString('id-ID', {
        style: 'currency', currency: 'IDR' 
    });
}
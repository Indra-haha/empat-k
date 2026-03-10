import type { Menu } from '../Types/Menu';

export const menusByRole: Record<string, Menu[]> = {
    guest: [
        { name: 'Dashboard', route: '/dashboard' },
        { name: 'Profile', route: '/profile' },
    ],
    pelanggan: [
        { name: 'Dashboard', route: '/dashboard' },
        { name: 'Produk', route: '/produk' },
        { name: 'Pesanan', route: '/pesanan' },
        { name: 'Tagihan', route: '/tagihan' },
    ],
    cs: [
        { name: 'Produk', route: '/produk' },
        { name: 'Pesanan', route: '/pesanan' },
        { name: 'Nota', route: '/nota' },
        { name: 'Role User' , route: '/role-user' },
    ],
    desainer: [
        { name: 'Permintaan', route: '/permintaan' },
        { name: 'Laporan', route: '/laporan' },
    ],
    kp: [
        { name: 'Order Kerja', route: '/order-kerja' },
    ],
    accounting: [
        { name: 'Nota', route: '/nota' },
        { name: 'Tagihan', route: '/tagihan' },
    ],
};
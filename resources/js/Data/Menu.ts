import type { Menu } from '../Types/Menu';

export const menusByRole: Record<string, Menu[]> = {
    guest: [
        { name: 'Product', route: '/products' },
        { name: 'Order', route: '/orders' },
        { name: 'Request', route: '/requests' },
    ],
    pelanggan: [
        { name: 'Product', route: '/products' },
        { name: 'Order', route: '/orders' },
        { name: 'Request', route: '/requests' },
        { name: 'Billing', route: '/billing' },
    ],
    cs: [
        { name: 'Product', route: '/products' },
        { name: 'Order', route: '/orders' },
        { name: 'Invoice', route: '/invoice' },
        { name: 'Role User' , route: '/role-user' },
    ],
    desainer: [
        { name: 'Request', route: '/requests' },
        { name: 'Laporan', route: '/laporan' },
    ],
    kp: [
        { name: 'Work-order', route: '/work-order' },
    ],
    accounting: [
        { name: 'Invoice', route: '/invoice' },
        { name: 'Billing', route: '/billing' },
    ],
};
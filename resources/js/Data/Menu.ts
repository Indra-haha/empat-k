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
        { name: 'Invoices', route: '/invoices' },
    ],
    cs: [
        { name: 'Order', route: '/orders' },
        { name: 'Work Order', route: '/work-orders' },
    ],
    desainer: [
        { name: 'Request', route: '/requests' },
    ],
    kp: [
        { name: 'Work-order', route: '/work-orders' },
    ],
    accounting: [
        { name: 'Orders', route: '/orders' },
    ],
};
import {
  IoPersonOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';

import { SidebarMenuItem } from '@/modules/ui/interfaces/sidebar-menu-item.interface';

export const sidebarAdminMenuData: SidebarMenuItem[] = [
  {
    title: 'Productos',
    href: '/admin/products',
    icon: <IoShirtOutline size={30} />,
  },
  {
    title: 'Ordenes',
    href: '/admin/orders',
    icon: <IoTicketOutline size={30} />,
  },
  {
    title: 'Usuarios',
    href: '/admin/users',
    icon: <IoPersonOutline size={30} />,
  },
];

import { IoPersonOutline, IoTicketOutline } from 'react-icons/io5';

import { SidebarMenuItem } from '@/modules/ui/interfaces/sidebar-menu-item.interface';

export const sidebarUserMenuData: SidebarMenuItem[] = [
  {
    title: 'Perfil',
    href: '/profile',
    icon: <IoPersonOutline size={30} />,
  },
  {
    title: 'Ordenes',
    href: '/orders',
    icon: <IoTicketOutline size={30} />,
  },
];

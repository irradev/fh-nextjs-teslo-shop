import {
  IoPersonOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';

export const sidebarAdminMenuData = [
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

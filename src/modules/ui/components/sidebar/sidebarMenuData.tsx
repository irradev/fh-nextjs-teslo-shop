import {
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoTicketOutline,
} from 'react-icons/io5';

export const sidebarMenuData = [
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
  {
    title: 'ingresar',
    href: '/auth/login',
    icon: <IoLogInOutline size={30} />,
  },
  {
    title: 'Salir',
    href: '/auth/logout',
    icon: <IoLogOutOutline size={30} />,
  },
];

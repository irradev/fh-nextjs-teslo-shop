import { SidebarMenuItem } from '../SidebarMenuItem';
import { sidebarPublicMenuData } from './sidebarPublicMenuData';

export const SidebarPublicMenuList = () => {
  return (
    <div className="flex flex-col gap-2 ">
      {sidebarPublicMenuData.map((item) => (
        <SidebarMenuItem
          key={item.href}
          {...item}
        />
      ))}
    </div>
  );
};

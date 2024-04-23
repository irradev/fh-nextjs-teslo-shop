import React from 'react';
import { SidebarMenuItem } from '../SidebarMenuItem';
import { sidebarUserMenuData } from './sidebarUserMenuData';

export const SidebarUserMenuList = () => {
  return (
    <div className="flex flex-col gap-2 ">
      {sidebarUserMenuData.map((item) => (
        <SidebarMenuItem
          key={item.href}
          {...item}
        />
      ))}
    </div>
  );
};

import React from 'react';
import { SidebarMenuItem } from './SidebarMenuItem';
import { sidebarMenuData } from './sidebarMenuData';

export const SidebarMenuList = () => {
  return (
    <div className="flex flex-col gap-2 mt-10">
      {sidebarMenuData.map((item) => (
        <SidebarMenuItem
          key={item.href}
          {...item}
        />
      ))}
    </div>
  );
};

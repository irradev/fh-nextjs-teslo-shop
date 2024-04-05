import React from 'react';
import { SidebarMenuItem } from '../SidebarMenuItem';
import { sidebarAdminMenuData } from './sidebarAdminMenuData';

export const SidebarAdminMenuList = () => {
  return (
    <>
      {/* Line Separator */}
      <div className="h-[1px] w-full bg-gray-200 my-5"></div>

      <div className="flex flex-col gap-2 ">
        {sidebarAdminMenuData.map((item) => (
          <SidebarMenuItem
            key={item.href}
            {...item}
          />
        ))}
      </div>
    </>
  );
};

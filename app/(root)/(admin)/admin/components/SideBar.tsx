import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { adminSidebarMenu } from './adminsidebarmenu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Link from 'next/link';
import { LuChevronRight } from 'react-icons/lu';
import { IoMdClose } from "react-icons/io";

const SideBar = () => {
  return (
    <Sidebar className='z-35'>
      <SidebarHeader className='h-14 p-3 border'>
        <div className='w-full h-full flex items-center justify-between'>
          <h1>Admin Panel</h1>
          <button className='md:hidden light-button'>
            <IoMdClose className='fill-white' />
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent className='p-3'>
        <SidebarMenu>
          {adminSidebarMenu.map((menu, index) => (
            <Collapsible key={index}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton asChild className="font-semibold px-2 py-5">
                    <Link href={menu?.href}>
                      <menu.Icon />
                      {menu.label}
                      {menu.submenu && menu.submenu.length > 0 &&
                        <LuChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      }
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {menu.submenu && menu.submenu.length > 0 &&
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {menu.submenu.map((subMenu, subIndex) => (
                        <SidebarMenuSubItem key={subIndex}>
                          <SidebarMenuSubButton asChild className='px-3 py-5'>
                            <Link href={subMenu?.href}>
                              {subMenu.label}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                }
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default SideBar
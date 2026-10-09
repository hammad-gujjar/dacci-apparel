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
    <Sidebar className='z-35 !bg-[#EDEEE7] dark:!bg-[#111111] border-r !border-[#111111]/10 dark:!border-white/10'>
      <SidebarHeader className='h-14 p-4 border-b border-[#111111]/10 dark:border-white/10 flex items-center justify-between'>
        <div className='w-full h-full flex items-center justify-between'>
          <h1 className='text-[12px] md:text-[14px] font-[main] tracking-wider text-[#111111] dark:text-[#EDEEE7] '>ADMIN</h1>
          <button className='md:hidden light-button'>
            <IoMdClose className='text-[#111111] dark:text-[#EDEEE7] text-xl' />
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent className='p-3'>
        <SidebarMenu>
          {adminSidebarMenu.map((menu, index) => (
            <Collapsible key={index}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton asChild className="font-[middle] text-[15px] px-3 py-6 text-[#111111] dark:text-[#EDEEE7] hover:!bg-[#111111]/5 dark:hover:!bg-white/5 transition-colors rounded-lg">
                    <Link href={menu?.href}>
                      <menu.Icon />
                      {menu.label}
                      {menu.submenu && menu.submenu.length > 0 &&
                        <LuChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 opacity-50" />
                      }
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {menu.submenu && menu.submenu.length > 0 &&
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {menu.submenu.map((subMenu, subIndex) => (
                        <SidebarMenuSubItem key={subIndex}>
                          <SidebarMenuSubButton asChild className='px-4 py-5 font-[middle] text-sm text-[#111111]/80 dark:text-[#EDEEE7]/80 hover:!text-[#111111] dark:hover:!text-[#EDEEE7] hover:!bg-[#111111]/5 dark:hover:!bg-white/5 rounded-lg'>
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
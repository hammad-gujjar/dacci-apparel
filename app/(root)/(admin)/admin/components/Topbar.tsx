'use client';
import Themeswitch from './Themeswitch';
import UserDropdown from './UserDropdown';
import { RiMenu4Fill } from "react-icons/ri";
import { useSidebar } from '@/components/ui/sidebar';

const Topbar = () => {
  const {toggleSidebar} = useSidebar();
  return (
    <div className='fixed border h-14 w-full top-0 left-0 z-30 md:pl-69 sm:pr-5 px-5 flex justify-between items-center bg-[#EDEEE7] dark:bg-[#111111] border-b border-[#111111]/10 dark:border-white/10'>

      <div>
        <span className="text-sm font-[middle] opacity-50 dark:opacity-40">Dashboard</span>
      </div>

      <div className='flex items-center gap-[2vw]'>
        <Themeswitch />
        <UserDropdown />
        <button className='md:hidden light-button'>
          <RiMenu4Fill onClick={toggleSidebar} className='fill-[#111111] dark:fill-[#EDEEE7] text-xl' />
        </button>
      </div>

    </div>
  )
}

export default Topbar;
'use client';
import Themeswitch from './Themeswitch';
import UserDropdown from './UserDropdown';
import { RiMenu4Fill } from "react-icons/ri";
import { useSidebar } from '@/components/ui/sidebar';

const Topbar = () => {
  const {toggleSidebar} = useSidebar();
  return (
    <div className='fixed border h-14 w-full top-0 left-0 z-30 md:pl-69 sm:pr-5 px-5 flex justify-between items-center bg-white dark:bg-card'>

      <div>
        Serch component
      </div>

      <div className='flex items-center gap-[2vw]'>
        <Themeswitch />
        <UserDropdown />
        <button className='md:hidden light-button'>
          <RiMenu4Fill onClick={toggleSidebar} className='fill-white' />
        </button>
      </div>

    </div>
  )
}

export default Topbar;
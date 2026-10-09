import React from 'react'
import { LuUser } from "react-icons/lu";

const UserDropdown = () => {
  return (
    <div className="flex items-center gap-2 p-1 md:p-2 rounded-lg hover:bg-[#111111]/5 dark:hover:bg-[#EDEEE7]/5 transition-colors cursor-pointer">
       <div className="w-8 h-8 rounded-full bg-[#111111] dark:bg-[#EDEEE7] flex items-center justify-center">
         <LuUser className="text-[#EDEEE7] dark:text-[#111111] text-lg" />
       </div>
    </div>
  )
}

export default UserDropdown
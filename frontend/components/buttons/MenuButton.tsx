import Sidebar from '@/forms/Sidebar';
import { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";

const MenuButton = ({ size = 50 }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {
        isSidebarOpen &&
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      }
      <div
        style={{ width: size, height: size }}
        className="rounded-full scale-100 cursor-pointer transition-colors
        hover:bg-[#4a5ac24d] duration-200
        active:bg-[#4a5ac2b3] active:duration-75">
        <RxHamburgerMenu
          style={{ width: size, height: size }}
          className="text-white bg-[#fff0] rounded-full scale-[0.85] cursor-pointer"
          onClick={() => setIsSidebarOpen(true)}
        />
      </div>

    </>

  )
}

export default MenuButton
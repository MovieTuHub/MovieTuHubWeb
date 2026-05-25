import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx"

const MenuButton = ({size = 50}) => {
  return (
    <div
      style={{width: size, height: size}}
      className="rounded-full scale-100 cursor-pointer transition-colors
        hover:bg-[#4a5ac24d] duration-200
        active:bg-[#4a5ac2b3] active:duration-75">
      <RxHamburgerMenu
          style={{width: size, height: size}}
          className="text-white bg-[#fff0] rounded-full scale-[0.85] cursor-pointer"
      />
    </div>
  )
}

export default MenuButton
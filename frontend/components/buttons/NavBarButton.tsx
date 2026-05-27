import React from 'react'

interface NavBarButtonProps {
  width?: number;
  height?: number;
  text: string;
  onClick?: () => void;
}

const NavBarButton = ({
  width = 95,
  height = 35,
  text,
  onClick
}: NavBarButtonProps) => {
  return (
    <button
      style={{ width: width, height: height }}
      onClick={onClick}
      className="
        bg-white text-black rounded-[10] cursor-pointer transition-colors
        hover:bg-background hover:text-white hover:shadow-[0px_0px_4px_5px_#4a5ac240] duration-200
        active:bg-[#4a5ac2] active:text-white active:shadow-[0px_0px_4px_5px_#4a5ac240] active:duration-75">
      {text}
    </button>
  )
}

export default NavBarButton
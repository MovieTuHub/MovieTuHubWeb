import React from 'react'

const NavBarButton = ({width = 95, height = 35, text = "NavButton", className = ""}) => {
  return (
    <div className={className}>
        <button
            style={{width : width, height: height}}
            className="
                bg-white text-black rounded-[10] cursor-pointer transition-colors
                hover:bg-background hover:text-white hover:shadow-[0px_0px_4px_5px_#4a5ac240] duration-200
                active:bg-[#4a5ac2] active:text-white active:shadow-[0px_0px_4px_5px_#4a5ac240] active:duration-75">
            {text}
        </button>
    </div>
  )
}

export default NavBarButton
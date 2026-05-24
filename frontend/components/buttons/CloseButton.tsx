import React from 'react'
import { FiX } from 'react-icons/fi'

const CloseButton = ({size = 50}) => {
  return (
    <div className="">
        <FiX
            style={{width: size, height: size}}
            className="
                text-white bg-[#ffffff1a] rounded-full
                cursor-pointer transition-colors
                hover:bg-[#ffffff4d] duration-200
                active:bg-[#ffffff9a] active:duration-75"
        />
    </div>
  )
}

export default CloseButton
"use client"

import React from 'react'
import { useState } from 'react'
import { FiBookmark } from 'react-icons/fi'

const Bookmark = ({right = 0, top = 0, scale = 1}) => {
    const [isActive, setIsActive] = useState(false);

  return (
    <div
        style={{
            right: right,
            top: top,
            transform: `scale(${scale})`,
            transformOrigin: "top right"
        }}
        className="absolute"
    >
        <FiBookmark
            onClick={() => setIsActive(!isActive)}
            className={`aspect-square cursor-pointer w-10 h-10 stroke-[1px] transition-colors
                ${isActive
                    ? "fill-white duration-75"
                    : "fill-[#ffffff33] hover:fill-[#ffffff80] duration-200"
                }`
            }
        />
    </div>
  )
}

export default Bookmark
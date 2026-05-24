"use client"

import React from 'react'
import { useState } from 'react'
import { FiBookmark } from 'react-icons/fi'

const SaveButton = ({width = 50, height = 50}) => {
    const [isActive, setIsActive] = useState(false);
  return (
    <div style={{width: width, height: height}}
        className="bg-background rounded-[10px] transition-colors
            hover:bg-[#4a5ac2] duration-200
            flex justify-center">
        <FiBookmark
            style={{width: width - 5, height: height - 5}}
            onClick={() => setIsActive(!isActive)}
            className={
                `aspect-square cursor-pointer
                stroke-white stroke-[1px] mt-[2.5px]
                ${isActive ? "fill-white" : "bg-[#fff0]"}`
            }
        />
    </div>
  )
}

export default SaveButton
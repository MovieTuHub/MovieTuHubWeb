"use client"

import React from 'react'
import { useState } from 'react'
import { MdCancel } from 'react-icons/md'

const ToggleButton = ({height = 35, text = "Button"}) => {
    const [isSelected, setIsSelected] = useState(false);
    return (
        <div className="">
            <div style={{ height: height }}
                onClick={() => setIsSelected(!isSelected)}
                className={`
                    relative px-3 text-white rounded-[10] transition-colors
                    shadow-[0px_0px_10px_5px_#4a5ac240] cursor-pointer
                    flex justify-center items-center gap-x-2
                    ${
                        isSelected
                            ? "bg-[#707594]"
                            : "bg-background hover:bg-[#4a5ac2] duration-200"
                    }`
                }
            >
                {
                    isSelected
                        ? <div style={{ width: height / 2, height: height / 2 }}
                            className="rounded-full flex items-center justify-center">
                            {isSelected ? <MdCancel size={height / 2}/> : ""}
                        </div>
                        : ""
                }
               {text}
            </div>
        </div>
    )
}

export default ToggleButton
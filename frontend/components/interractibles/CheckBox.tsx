"use client"

import React from 'react'
import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'

const CheckBox = ({ size = 50 }) => {
    const [isChecked, setIsChecked] = useState(false);
    
    return (
        <div className="">
            <div style={{
                width: size,
                height: size,
                borderWidth: `${size / 10}px`,
                borderRadius: `${size / 5}px`
            }}
                onClick={() => setIsChecked(!isChecked)}
                className={`transition-colors flex justify-center items-center
                    ${
                        isChecked
                            ? "bg-[#4a5ac2] duration-75"
                            : "bg-white hover:bg-[#a0a0a0] duration-200"
                    }`
                }>
                {
                    isChecked
                        ? <FaCheck style={{width: size / 2, height: size / 2}} className="text-white"/>
                        : ""
                }
            </div>
        </div>
    )
}

export default CheckBox
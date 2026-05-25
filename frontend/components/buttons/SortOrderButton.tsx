"use client"

import React, { useState } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

const SortOrderButton = ({ width = 150, height = 50 }) => {
    const [isAscending, setIsAscending] = useState(true);
    return (
        <div className="">
            <div style={{ width: width, height: height }}
                onClick={() => setIsAscending(!isAscending)}
                className="
                    group bg-background text-white rounded-[10]
                    shadow-[0px_0px_10px_5px_#4a5ac240] cursor-pointer
                    flex justify-center items-center gap-x-2
                    hover:bg-[#4a5ac2] transition-colors duration-150
                    active:bg-[#707594] active:duration-75"
                >
                {isAscending ? "Ascending" : "Descending"}
                <div
                    style={{width: height / 2, height: height / 2}}
                    className="bg-[#4a5ac233] group-hover:bg-[#000d6033] rounded-full flex items-center justify-center">
                    {isAscending ? <FaChevronUp /> : <FaChevronDown />}
                </div>
            </div>
        </div>
    )
}

export default SortOrderButton
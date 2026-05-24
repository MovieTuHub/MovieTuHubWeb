import React from 'react'
import { FaPlay } from 'react-icons/fa'

const PlayButton = ({ size = 250 }) => {
    return (
        <div className="">
            <div style={{ width: size, height: size }}
                className="rounded-full flex justify-center cursor-pointer
                    bg-[#555555b3] transition-colors
                    hover:bg-[#888888b3] duration-200
                    active:bg-[#bbbbbbb3] active:duration-75
                    shadow-[0px_0px_20px_10px_#00000040]">
                <FaPlay
                    style={{ width: size * 0.6, height: size * 0.6 }}
                    className="text-[#fff9] self-center ml-5"
                />
            </div>
        </div>
    )
}

export default PlayButton
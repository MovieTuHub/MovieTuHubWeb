import React from 'react'
import { FaPlay } from 'react-icons/fa'

interface PlayTrailerButtonProps {
  width?: number;
  height?: number;
  href: string;
}

const PlayTrailerButton = ({width = 140, height = 50, href}: PlayTrailerButtonProps) => {
  return (
    <a href={href} style={{width: width, height: height}}
        className="bg-background transition-colors
            hover:bg-[#4a5ac2] duration-200
            shadow-[0px_0px_4px_5px_#4a5ac240] rounded-[10]
            flex justify-evenly items-center cursor-pointer">
        <FaPlay
            style={{width: height / 2, height: height / 2}}
            className="text-white"
        />
        <div className="text-white">Play trailer</div>
    </a>
  )
}

export default PlayTrailerButton
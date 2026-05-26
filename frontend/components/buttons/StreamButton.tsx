import Image from 'next/image'
import React from 'react'

interface StreamButtonProps {
    width?: number;
    height?: number;
    href: string;
}

const StreamButton = ({width = 140, height = 50, href}: StreamButtonProps) => {
  return (
    <a href={href} style={{width: width, height: height}}
        className="bg-background transition-colors
            hover:bg-[#4a5ac2] duration-200
            shadow-[0px_0px_4px_5px_#4a5ac240] rounded-[10]
            flex justify-evenly items-center cursor-pointer">
        <Image
            alt="Netflix logo"
            src={"/Netflix_logo.png"}
            width={height / 2}
            height={height / 2}
            className="text-white"
        />
        <div className="text-white">Stream Now</div>
    </a>
  )
}

export default StreamButton
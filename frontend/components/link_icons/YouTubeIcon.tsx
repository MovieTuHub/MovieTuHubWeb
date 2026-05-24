import React from 'react'
import { FiYoutube } from 'react-icons/fi'

const YouTubeIcon = ({size = 75, link = ""}) => {
  return (
    <a href={link}>
        <FiYoutube
            style={{width: size, height: size}}
            className="text-white transition-colors stroke-1
              hover:text-[#4a5ac2] duration-200
              active:text-[#707594] active:duration-75"
        />
    </a>
  )
}

export default YouTubeIcon
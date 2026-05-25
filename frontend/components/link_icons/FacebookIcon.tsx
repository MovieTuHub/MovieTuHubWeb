import React from 'react'
import { FiFacebook } from 'react-icons/fi'

const FacebookIcon = ({size = 75, href = ""}) => {
  return (
    <a href={href}>
        <FiFacebook
            style={{width: size, height: size}}
            className="text-white transition-colors stroke-1
              hover:text-[#4a5ac2] duration-200
              active:text-[#707594] active:duration-75"
        />
    </a>
  )
}

export default FacebookIcon
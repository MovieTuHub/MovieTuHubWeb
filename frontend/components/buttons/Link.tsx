import React from 'react'

const Link = ({href = "", fontWeight = 20, text = "", isUnderlined = false}) => {
  return (
    <div>
        <a href={href}
            className={`text-white transition-colors
                hover:text-[#4a5ac2] duration-200
                active:text-[#707594] active:duration-75
                text-[${fontWeight}px]
                ${isUnderlined ? "underline" : ""}`}
        >
            {text}
        </a>
    </div>
  )
}

export default Link
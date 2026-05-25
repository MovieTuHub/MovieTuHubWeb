import React, { ReactNode } from 'react'

interface LinkProps {
  href?: string;
  fontSize?: number;
  fontWeight?: string;
  text?: string;
  isUnderlined?: boolean;
  textIsCentered?: boolean;
  children?: ReactNode;
}

const Link = ({
  href = "",
  fontSize = 20,
  fontWeight = "",
  text = "",
  isUnderlined = false,
  textIsCentered = false,
  children}: LinkProps
) => {
  return (
    <div>
        <a href={href}
            style={{fontSize: `${fontSize}px`, fontWeight: fontWeight}}
            className={`text-white transition-colors
                hover:text-[#4a5ac2] duration-200
                active:text-[#707594] active:duration-75
                ${isUnderlined ? "underline" : ""}
                ${textIsCentered ? "block text-center" : ""}`}
        >
            {children || text}
        </a>
    </div>
  )
}

export default Link
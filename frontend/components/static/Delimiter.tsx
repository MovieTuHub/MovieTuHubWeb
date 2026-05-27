import React from 'react'

interface DelimiterProps {
  width?: string | number;
  isHorizontal?: boolean;
}

const Delimiter = ({width = "94%", isHorizontal = false}: DelimiterProps) => {
  return (
    <hr style={{width: width}}
        className={`
            h-1 border-none bg-linear-to-r
            from-transparent via-[#4a5ac2] to-transparent
            ${isHorizontal ? "rotate-90" : ""}`}
    />
  )
}

export default Delimiter
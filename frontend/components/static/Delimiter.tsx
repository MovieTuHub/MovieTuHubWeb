import React from 'react'

const Delimiter = ({width = "94%"}) => {
  return (
    <hr style={{width: width}}
        className="
            h-1 border-none bg-linear-to-r
            from-transparent via-[#4a5ac2] to-transparent
    "/>
  )
}

export default Delimiter
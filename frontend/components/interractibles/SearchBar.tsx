import React from 'react'

const SearchBar = ({width = 500, placeholder = "Search"}) => {
  return (
    <div className="w-full flex justify-center">
        <input
            type="search"
            placeholder={placeholder}
            style={{
                width: `clamp(${Math.min(200, width * 0.4)}px, 35vw, ${width}px)`,
                height: 35
            }}
            className={`
                border border-black rounded-full
                flex items-center px-6.25
                bg-white transition-colors
                hover:bg-[#e0e0e0] duration-200
                focus:outline-0`
            }>
        </input>
    </div>
  )
}

export default SearchBar
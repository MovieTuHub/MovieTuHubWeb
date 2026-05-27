import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SearchBar = ({ width = 500, placeholder = "Search" }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    }

    return (
        <div className="w-full flex justify-center">
            <input
                type="search"
                placeholder={placeholder}
                style={{
                    width: `clamp(${Math.min(200, width * 0.4)}px, 35vw, ${width}px)`,
                    height: 35
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className={`
                    border border-black rounded-full
                    flex items-center px-4
                    bg-white transition-colors
                    hover:bg-[#d0d0d0] duration-200
                    focus:bg-white focus:outline-0`
                }>
            </input>
        </div>
    )
}

export default SearchBar
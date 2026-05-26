"use client"

import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import Bookmark from '../buttons/Bookmark'

const MoviePosterSearchResult = ({ width = 220, height = 330, src = "", movieTitle = "", href = "" }) => {
    const bookmarkScale = width / 160;

    return (
        <div
            style={{ width: width }}
            className="relative shrink-0 object-cover">
            <a href={href}>
                <Image
                    alt="Movie poster"
                    width={width}
                    height={height}
                    src={src}
                    className="aspect-2/3 transition-shadow hover:shadow-[0px_0px_6px_6px_#4a5ac280] duration-300 select-none"
                />
            </a>
            <div className="absolute right-1 top-1">
                <Bookmark
                    right={bookmarkScale}
                    top={bookmarkScale}
                    scale={bookmarkScale}
                />
            </div>
        </div>
    )
}

export default MoviePosterSearchResult
"use client"

import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import Bookmark from '../buttons/Bookmark'

const MoviePoster = ({ width = 220, height = 330, defaultSrc = "", hoverSrc = "", movieTitle = "", movieSrc = "" }) => {
  const bookmarkScale = width / 220;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ width: width }}
      className="shrink-0 object-cover">
      <div className="relative">
        <a href={movieSrc}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <Image
            alt="Movie poster"
            width={width}
            height={height}
            src={isHovered ? hoverSrc : defaultSrc}
            className="aspect-2/3 transition-shadow hover:shadow-[0px_0px_6px_6px_#4a5ac280] duration-300"
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
      <div className="flex justify-center py-1.25 text-[16px] text-white">
        <a href={movieSrc} className="cursor-pointer text-center">{movieTitle}</a>
      </div>
    </div>
  )
}

export default MoviePoster
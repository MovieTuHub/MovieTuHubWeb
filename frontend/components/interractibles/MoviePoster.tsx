import Image from 'next/image'
import React from 'react'
import Bookmark from '../buttons/Bookmark'

const MoviePoster = ({ width = 220, height = 330, src = "", movieTitle = "" }) => {
  const bookmarkScale = width / 220;

  return (
    <div
      style={{width: width}}
      className="shrink-0 object-cover">
      <Image
        alt="Movie poster"
        width={width}
        height={height}
        src={src}
        className="aspect-2/3 transition-shadow hover:shadow-[0px_0px_6px_6px_#4a5ac280] duration-300"
      />
      <Bookmark
        right={10 * bookmarkScale}
        top={10 * bookmarkScale}
        scale={bookmarkScale}
      />
      <div className="flex justify-center py-1.25 text-[16px]">
        {movieTitle}
      </div>
    </div>
  )
}

export default MoviePoster
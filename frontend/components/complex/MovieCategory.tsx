"use client"

import React from 'react'
import { useState } from 'react'
import MoviePoster from '../interractibles/MoviePoster'
import NextButton from '../buttons/NextButton';

interface MovieCategoryProps {
    text: string;
    imagesDef: Array<string>;
    imagesHover: Array<string>;
    movieTitles: Array<string>
}

const MovieCategory = ({ text, imagesDef, imagesHover, movieTitles }: MovieCategoryProps) => {
    const [startIndex, setStartIndex] = useState(0);

    const handlePrev = () => {
        setStartIndex(startIndex === 0 ? imagesDef.length - 1 : startIndex - 1)
    }

    const handleNext = () => {
        setStartIndex(startIndex === imagesDef.length - 1 ? 0 : startIndex + 1)
    }

    return (
        <div className="flex flex-col gap-y-5">
            <div className="text-white text-3xl px-[14%]">
                {text}
            </div>
            <div className="flex justify-center items-center">
                <div className="absolute flex justify-center gap-x-[85%] w-full">
                    <NextButton onClick={handlePrev} isFlipped />
                    <NextButton onClick={handleNext} />
                </div>
                <div className="flex justify-center gap-x-[8%]">
                    {
                        imagesDef.map((_, index) => {
                            return <MoviePoster
                                key={(startIndex + index) % imagesDef.length}
                                defaultSrc={imagesDef[(startIndex + index) % imagesDef.length]}
                                hoverSrc={imagesHover[(startIndex + index) % imagesDef.length]}
                                movieTitle={movieTitles[(startIndex + index) % imagesDef.length]}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieCategory
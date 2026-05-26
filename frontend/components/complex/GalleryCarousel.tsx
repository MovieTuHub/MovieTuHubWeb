"use client"

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import NextButton from '../buttons/NextButton'

interface GalleryCarouselProps {
    imageSources: Array<string>;
    className?: string;
}

const GalleryCarousel = ({ imageSources = [], className }: GalleryCarouselProps) => {
    const [startingIndex, setStartingIndex] = useState(0);

    const handlePrev = () => {
        setStartingIndex(() => startingIndex === 0 ? imageSources.length - 1 : startingIndex - 1)
    }

    const handleNext = () => {
        setStartingIndex(() => startingIndex === imageSources.length - 1 ? 0 : startingIndex + 1)
    }

    return (
        <div className="w-full flex justify-between items-center px-20 select-none">
            <NextButton onClick={handlePrev} isFlipped />
            <div className="flex justify-center gap-x-20">
                {
                    imageSources.map((_, index) => (
                        index < 2
                            ? <Image
                                key={index}
                                alt="Gallery image"
                                width={500}
                                height={230}
                                src={imageSources[(startingIndex + index) % imageSources.length]}
                                className="shadow-[0px_0px_15px_10px_#4a5ac240]"
                                priority
                            />
                            : ""
                    ))
                }
            </div>
            <NextButton onClick={handleNext} />
        </div>
    )
}

export default GalleryCarousel
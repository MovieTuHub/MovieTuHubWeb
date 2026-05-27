"use client"

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import NextButton from '../buttons/NextButton'
import CarouselDots from '../buttons/CarouselDots'

interface MainPageMovieCarouselProps {
    movieLogos: Array<string>;
    backdrops: Array<string>;
    className?: string;
}

const MainPageMovieCarousel = ({ movieLogos = [], backdrops = [], className }: MainPageMovieCarouselProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const currentBackdrop = backdrops[currentSlide];
    const currentLogo = movieLogos[currentSlide];

    const handleSlideChange = (index: number) => {
        setCurrentSlide(index);
    }

    const handlePrev = () => {
        setCurrentSlide(() => currentSlide === 0 ? backdrops.length - 1 : currentSlide - 1)
    }

    const handleNext = () => {
        setCurrentSlide(() => currentSlide === backdrops.length - 1 ? 0 : currentSlide + 1)
    }

    return (
        <div className={
            `relative w-full h-125 overflow-hidden
            flex flex-col justify-between select-none`
        }>
            <div className="-z-50 w-full">
                <Image
                    alt="Movie logo"
                    width={300}
                    height={300}
                    src={currentLogo}
                    className="absolute left-48 bottom-16 z-10 max-w-75 max-h-75"
                />
                <Image
                    key={currentSlide}
                    alt="Movie backdrop"
                    fill
                    src={currentBackdrop}
                    className="object-cover object-top transition-opacity duration-200"
                    priority
                />
            </div>
            <div className="flex justify-center w-screen gap-x-[80%] mt-10">
                <NextButton onClick={handlePrev} isFlipped />
                <NextButton onClick={handleNext} />
            </div>
            <div className="mb-10">
                <CarouselDots
                    dotsSize={20}
                    currentSlide={currentSlide}
                    totalSlides={backdrops.length}
                    onChangeSlide={handleSlideChange}
                />
            </div>
        </div>
    )
}

export default MainPageMovieCarousel
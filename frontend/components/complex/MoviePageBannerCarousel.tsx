"use client"

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import NextButton from '../buttons/NextButton'
import CarouselDots from '../buttons/CarouselDots'
import MoviePoster from '../interractibles/MoviePoster'
import MoviePosterSearchResult from '../interractibles/MoviePosterNoHoverSrc'

interface MovieCarouselProps {
    movieTitle: string;
    banners: Array<string>;
    posters: Array<string>;
    className?: string;
}

const MoviePageBannerCarousel = ({
    movieTitle,
    banners,
    posters
}: MovieCarouselProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const currentBanner = banners[currentSlide];
    const currentPoster = posters[currentSlide];

    const handleSlideChange = (index: number) => {
        setCurrentSlide(index);
    }

    const handlePrev = () => {
        setCurrentSlide(() => currentSlide === 0 ? banners.length - 1 : currentSlide - 1)
    }

    const handleNext = () => {
        setCurrentSlide(() => currentSlide === banners.length - 1 ? 0 : currentSlide + 1)
    }

    return (
        <div>
            <div className={
                `relative overflow-hidden w-full h-125
                flex flex-col justify-around select-none`
            }>
                <Image
                    key={currentSlide}
                    alt="Movie banner carousel"
                    fill
                    src={currentBanner}
                    className="object-cover object-top transition-opacity duration-200 -z-50"
                    priority
                />
                <div className="flex justify-center w-screen gap-x-[80%] mt-48">
                    <NextButton onClick={handlePrev} isFlipped />
                    <NextButton onClick={handleNext} />
                </div>
                <CarouselDots
                    dotsSize={20}
                    currentSlide={currentSlide}
                    totalSlides={banners.length}
                    onChangeSlide={handleSlideChange}
                />
            </div>
            <div className="absolute left-58.75 top-62.5 z-10 max-w-57.5 max-h-75 select-none">
                <Image
                    alt="Movie poster"
                    width={230}
                    height={230}
                    src={currentPoster}
                    className="shadow-[0px_0px_20px_15px_#4a5ac280]"
                />
                <div className="
                    text-white text-center text-[24px] mt-6 font-semibold"
                >
                    {movieTitle}
                </div>
            </div>
        </div>
    )
}

export default MoviePageBannerCarousel
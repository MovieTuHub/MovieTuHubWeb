"use client"

import Image from 'next/image'
import { useState } from 'react'
import CarouselDots from '../buttons/CarouselDots'
import NextButton from '../buttons/NextButton'

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
                `relative overflow-hidden w-full h-200
                flex flex-col justify-around select-none`
            }>
                <Image
                    key={currentSlide}
                    alt="Movie banner carousel"
                    fill
                    src={currentBanner}
                    className="object-cover object-center transition-opacity duration-200 -z-50"
                    priority
                />
                <div className="flex justify-center w-screen gap-x-[80%] mt-48">
                    <NextButton onClick={handlePrev} isFlipped />
                    <NextButton onClick={handleNext} />
                </div>
                <div className='relative top-20'>
                    <CarouselDots
                        dotsSize={20}
                        currentSlide={currentSlide}
                        totalSlides={banners.length}
                        onChangeSlide={handleSlideChange}

                    />
                </div>
            </div>
            <div className="absolute left-88.75 top-132.5 z-10 max-w-77.5 max-h-85 select-none">
                <Image
                    alt="Movie poster"
                    width={530}
                    height={530}
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
"use client"

import React, { useState } from 'react'

interface CarouselDotsProps {
    dotsSize?: number;
    totalSlides: number;
    currentSlide: number;
    onChangeSlide: (index: number) => void;
}

const CarouselDots = ({
    dotsSize = 10,
    totalSlides = 1,
    currentSlide = 1,
    onChangeSlide
}: CarouselDotsProps) => {
    return (
        <div className="flex justify-center items-center gap-x-3">
            {
                Array.from({ length: totalSlides }).map((_, index) => (
                    <div key={index}
                        style={{width: dotsSize, height: dotsSize}}
                        onClick={() => onChangeSlide(index)}
                        className={`rounded-full transition-all duration-200 ${
                            currentSlide == index
                                ? "bg-white"
                                : "bg-[#ffffff4d] hover:bg-[#fff9]"
                        }`}
                    />
                ))
            }
        </div>
    )
}

export default CarouselDots
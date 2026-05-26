"use client"

import React from 'react'
import { useState } from 'react'
import NextButton from '../buttons/NextButton'
import Review from '../static/Review'

interface Review {
    profileImgSrc?: string;
    userName: string;
    givenRating: number;
    comment?: string;
}

interface ReviewsCarouselProps {
    reviews: Array<Review>;
    className?: string;
}

const ReviewsCarousel = ({ reviews = [], className }: ReviewsCarouselProps) => {
    const [startingIndex, setStartingIndex] = useState(0);

    const handlePrev = () => {
        setStartingIndex(() => startingIndex === 0 ? reviews.length - 1 : startingIndex - 1)
    }

    const handleNext = () => {
        setStartingIndex(() => startingIndex === reviews.length - 1 ? 0 : startingIndex + 1)
    }

    return (
        <div className="w-full flex justify-between items-center px-8 select-none">
            <NextButton onClick={handlePrev} isFlipped />
            <div>
                <div className="w-full flex justify-center gap-x-6">
                    {
                        reviews.map((_, index) => (
                            index < 3
                                ? <Review
                                    key={index}
                                    profileImgSrc={reviews[(startingIndex + index) % reviews.length].profileImgSrc}
                                    userName={reviews[(startingIndex + index) % reviews.length].userName}
                                    givenRating={reviews[(startingIndex + index) % reviews.length].givenRating}
                                    comment={reviews[(startingIndex + index) % reviews.length].comment}
                                    />
                                : ""
                        ))
                    }
                </div>
            </div>
            <NextButton onClick={handleNext} />
        </div>
    )
}

export default ReviewsCarousel
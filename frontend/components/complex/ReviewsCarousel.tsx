"use client"

import { useState } from 'react'
import NextButton from '../buttons/NextButton'
import Review from '../static/Review'

interface ReviewsCarouselProps {
    reviews: Array<ReviewResponse>;
}

const ReviewsCarousel = ({ reviews = [] }: ReviewsCarouselProps) => {
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
                        reviews.map((review, index) => (
                            index < 3
                                ? <Review
                                    key={index}
                                    profileImgSrc={review.user_image ? `data:${review.user_image.mime};base64,${review.user_image.image}` : "/DefaultProfileImage.png"}
                                    userName={review.username}
                                    givenRating={review.score}
                                    comment={review.review_text}
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
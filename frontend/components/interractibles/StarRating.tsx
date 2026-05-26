"use client"

import { LargeNumberLike } from 'crypto'
import React from 'react'
import { useState } from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa'

interface StarRatingProps {
    starSize: number;
}

const StarRating = ({ starSize }: StarRatingProps) => {
    const [hoveredStars, setHoveredStars] = useState(0);
    const [selectedStars, setSelectedStars] = useState(0);

    return (
        <div className="flex gap-x-5"
            onMouseLeave={() => setHoveredStars(0)}>
            {
                [1, 2, 3, 4, 5].map((_, index) => {
                    const starValue = index + 1;

                    const isHovered = hoveredStars > 0;
                    const isSelected = isHovered
                        ? starValue <= hoveredStars
                        : starValue <= selectedStars;

                    return (
                        <div
                            key={index}
                            onMouseEnter={() => setHoveredStars(starValue)}
                            onClick={() => setSelectedStars(starValue)}
                            style={{ width: starSize, height: starSize }}
                        >
                            <FaStar
                                size={starSize}
                                className={`cursor-pointer transition-all duration-150
                                ${isSelected
                                        ? (isHovered ? "text-[#ebb500a0] stroke-white stroke-[30px]" : "text-[#ebb500] storke-0")
                                        : "text-transparent stroke-white stroke-[30px]"
                                    }`
                                }
                            />
                        </div>
                    )
                })}
        </div>
    )
}

export default StarRating
"use client"

import React from 'react'
import { useState } from 'react'
import NextButton from '../buttons/NextButton'
import CastBanner from '../static/CastBanner'

interface Actor {
    photo: string;
    fullName: string;
    role: string;
}

interface ActorsCarouselProps {
    actors: Array<Actor>;
}

const ActorsCarousel = ({ actors = [] }: ActorsCarouselProps) => {
    const [startingIndex, setStartingIndex] = useState(0);

    const handlePrev = () => {
        setStartingIndex(() => startingIndex === 0 ? actors.length - 1 : startingIndex - 1)
    }

    const handleNext = () => {
        setStartingIndex(() => startingIndex === actors.length - 1 ? 0 : startingIndex + 1)
    }

    return (
        <div className="w-full flex justify-between items-center px-16 select-none">
            <NextButton onClick={handlePrev} isFlipped />
            <div>
                <div className="w-full flex justify-center gap-x-14">
                    {
                        actors.map((_, index) => (
                            index < 5
                                ? <CastBanner
                                    key={index}
                                    actorPhotoSrc={actors[(startingIndex + index) % actors.length].photo}
                                    actorName={actors[(startingIndex + index) % actors.length].fullName}
                                    actorRole={actors[(startingIndex + index) % actors.length].role}
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

export default ActorsCarousel
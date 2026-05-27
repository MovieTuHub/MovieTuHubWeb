"use client"

import { useState } from 'react'
import NextButton from '../buttons/NextButton'
import CastBanner from '../static/CastBanner'

interface ActorsCarouselProps {
    cast: Array<MovieCastResponse>;
}

const ActorsCarousel = ({ cast: cast = [] }: ActorsCarouselProps) => {
    const [startingIndex, setStartingIndex] = useState(0);

    const handlePrev = () => {
        setStartingIndex(() => startingIndex === 0 ? cast.length - 1 : startingIndex - 1)
    }

    const handleNext = () => {
        setStartingIndex(() => startingIndex === cast.length - 1 ? 0 : startingIndex + 1)
    }

    return (
        <div className="w-full flex justify-between items-center px-16 select-none">
            <NextButton onClick={handlePrev} isFlipped />
            <div>
                <div className="w-full flex justify-center gap-x-14">
                    {
                        cast.map((castMember, index) => (
                            index < 5
                                ? <CastBanner
                                    key={index}
                                    actorPhotoSrc={`data:${castMember.actor.image.mime};base64,${castMember.actor.image.image}`}
                                    actorName={castMember.actor.name}
                                    actorRole={castMember.role}
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
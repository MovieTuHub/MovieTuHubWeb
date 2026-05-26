import Image from 'next/image'
import React from 'react'
import StarRatingStatic from './StarRatingStatic'

interface ReviewProps {
    width?: number;
    height?: number;
    profileImgSrc?: string;
    userName: string;
    givenRating: number;
    comment?: string;
}

const Review = ({
    width = 400,
    height = 300,
    profileImgSrc = "/DefaultProfileImage.png",
    userName,
    givenRating,
    comment
}: ReviewProps) => {
    return (
        <div style={{ width: width, height: height }}
            className="bg-white rounded-[15px] border border-black px-6 py-4
                shadow-[0px_4px_4px_0px_#00000040,inset_260px_0px_4px_0px_#00000012]"
        >
            <div className="relative flex flex-col gap-y-5">
                <div className="flex flex-col gap-y-3">
                    <div className="flex gap-x-5 items-center">
                        <Image
                            width={width / 10}
                            height={width / 10}
                            alt="Profile avatar"
                            src={profileImgSrc}
                            className="rounded-full top-[5%]">
                        </Image>
                        <div className="text-[24px] font-bold">{userName}</div>
                    </div>
                    <StarRatingStatic starsLit={Math.floor(givenRating)} />
                </div>
                <div className="text-[18px]">
                    {comment}
                </div>
            </div>
        </div>
    )
}

export default Review
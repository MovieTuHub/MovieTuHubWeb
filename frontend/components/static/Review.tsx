import Image from 'next/image'
import React from 'react'
import StarRatingStatic from './StarRatingStatic'

const Review = ({
    width = 500,
    height = 280,
    source = "/Avatar_default.png",
    username = "Username",
    starsLit = 2,
    text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam cupiditate illo iste iure explicabo sint exercitationem, eum adipisci odio inventore nostrum harum iusto dolorem nulla impedit quia ullam, aliquam laboriosam!"
}) => {
    return (
        <div style={{ width: width, height: height }}
            className="bg-white rounded-[15px] border border-black px-6 py-4
                shadow-[0px_4px_4px_0px_#00000040,inset_360px_0px_4px_0px_#00000012]"
        >
            <div className="relative flex flex-col gap-y-3">
                <div className="flex gap-x-5 items-center">
                    <Image
                        width={width / 10}
                        height={width / 10}
                        alt="Profile avatar"
                        src={source}
                        className="rounded-full top-[5%]">
                    </Image>
                    <div className="text-[32px] font-bold">{username}</div>
                </div>
                <StarRatingStatic starsLit={starsLit}/>
                <div className="text-[18px]">
                    {text}
                </div>
            </div>
        </div>
    )
}

export default Review
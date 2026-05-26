import React from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa'

const StarRatingStatic = ({starSize = 20, starsLit = 0, className = "", }) => {
    return (
        <div className={"flex gap-x-5 " + className}>
            {[1, 2, 3, 4, 5].map((index) => 
                starsLit >= index
                    ? <FaStar key={index} size={starSize} style={{color: "#ebb500"}}/>
                    : <FaRegStar key={index} size={starSize} style={{color: "#000"}}/>
            )}
        </div>
    )
}

export default StarRatingStatic
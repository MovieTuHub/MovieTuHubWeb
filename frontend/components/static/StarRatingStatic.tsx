import React from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa'

const StarRatingStatic = ({className = "", starsLit = 0}) => {
    return (
        <div className={"flex gap-x-5 " + className}>
            {[1, 2, 3, 4, 5].map((index) => 
                starsLit >= index
                    ? <FaStar key={index} size={30} style={{color: "#ebb500"}}/>
                    : <FaRegStar key={index} size={30} style={{color: "#000"}}/>
            )}
        </div>
    )
}

export default StarRatingStatic
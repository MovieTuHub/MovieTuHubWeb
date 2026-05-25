import React from 'react'
import { FaPlus } from 'react-icons/fa'

const ReviewButton = ({width = 105, height = 45}) => {
  return (
    <div style={{width: width, height: height}}
            className="bg-background transition-colors
                hover:bg-[#4a5ac2] duration-200
                shadow-[0px_0px_4px_5px_#4a5ac240] rounded-[10] cursor-pointer
                flex justify-evenly items-center">
            <FaPlus
                style={{width: height / 2, height: height / 2}}
                className="text-white"
            />
            <div className="text-white">Review</div>
        </div>
  )
}

export default ReviewButton
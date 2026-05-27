import React from 'react'
import { FaPlus } from 'react-icons/fa'

interface ReviewButtonProps {
    width?: number;
    height?: number;
    onClick: () => void;
}

const ReviewButton = ({
    width = 105, height = 45, onClick
}: ReviewButtonProps) => {
  return (
    <div
        onClick={onClick}
        style={{width: width, height: height}}
            className="bg-background transition-colors
                hover:bg-[#4a5ac2] duration-200
                shadow-[0px_0px_4px_5px_#4a5ac240] rounded-[10] cursor-pointer
                flex justify-evenly items-center z-50">
            <FaPlus
                style={{width: height / 2, height: height / 2}}
                className="text-white"
            />
            <div className="text-white">Review</div>
        </div>
  )
}

export default ReviewButton
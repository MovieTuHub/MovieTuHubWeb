import React from 'react'
import { FaPlay } from 'react-icons/fa'

const NextButton = ({size = 70}) => {
  return (
    <div className="">
        <div style={{width: size, height: size}}
            className="bg-[#ffffff33] rounded-full flex justify-center">
            <FaPlay
                style={{width: size - 25, height: size - 25}}
                className="text-[#fff9] self-center ml-2 cursor-pointer transition-colors
                    hover:text-[#fffc] duration-200
                    active:text-[#fff] active:duration-75"
            />
        </div>
    </div>
  )
}

export default NextButton
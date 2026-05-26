import React from 'react'
import { FaPlay } from 'react-icons/fa'

interface NextButtonProps {
  size?: number;
  isFlipped?: boolean;
  className?: string;
  onClick: () => void;
}

const NextButton = ({
  size = 70,
  isFlipped = false,
  onClick
}: NextButtonProps) => {
  return (
    <div
      onClick={onClick}
      style={{ width: size, height: size }}
      className="bg-[#ffffff33] rounded-full flex justify-center select-none">
      <FaPlay
        style={{ width: size - 25, height: size - 25 }}
        className={`
          text-[#fff9] self-center cursor-pointer transition-colors
          hover:text-[#fffc] duration-200
          active:text-[#fff] active:duration-75
          ${isFlipped ? "rotate-180 mr-2" : "ml-2"}`
        }
      />
    </div>
  )
}

export default NextButton
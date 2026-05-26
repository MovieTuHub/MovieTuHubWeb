import React from 'react'
import Delimiter from './Delimiter'

interface CategoryDelimiterProps {
  text: string;
  isSemibold?: boolean;
  isBold?: boolean;
}

const CategoryDelimiter = ({text, isSemibold, isBold}: CategoryDelimiterProps) => {
  return (
    <div className="flex flex-col gap-y-3 w-full">
        <Delimiter className="self-center"/>
        <div className={`px-10 text-white text-3xl
          ${isSemibold ? "font-semibold" : (isBold ? "font-bold" : "")}`}>
            {text}
        </div>
    </div>
  )
}

export default CategoryDelimiter
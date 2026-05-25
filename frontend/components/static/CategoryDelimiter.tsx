import React from 'react'
import Delimiter from './Delimiter'

const CategoryDelimiter = ({text = "Category"}) => {
  return (
    <div className="flex flex-col gap-y-3 w-full">
        <Delimiter className="self-center"/>
        <div className="px-10 text-white text-3xl">{text}</div>
    </div>
  )
}

export default CategoryDelimiter
import React from 'react'

interface CategoryBlobProps {
  height: number;
  text: string;
}

const CategoryBlob = ({height, text}: CategoryBlobProps) => {
  return (
    <div className="">
        <div style={{height: height}}
            className="
                bg-[#4a5ac2] rounded-[10] shadow-[0px_0px_4px_5px_#4a5ac240]
                text-white text-center flex flex-col justify-center px-5
                ">
            {text}
        </div>
    </div>
  )
}

export default CategoryBlob
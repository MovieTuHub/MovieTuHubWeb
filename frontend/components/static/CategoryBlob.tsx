import React from 'react'

const CategoryBlob = ({width = 90, height = 35, text = "TEXT"}) => {
  return (
    <div className="">
        <div style={{width: width, height: height}}
            className="
                bg-[#4a5ac2] rounded-[10] shadow-[0px_0px_4px_5px_#4a5ac240]
                text-white text-center flex flex-col justify-center
                ">
            {text}
        </div>
    </div>
  )
}

export default CategoryBlob
import React from 'react'

const SendReviewButton = ({width = 140, height = 45}) => {
  return (
    <div style={{width: width, height: height}}
        className="bg-background rounded-[10px] transition-colors
          hover:bg-[#4a5ac2] duration-200
          shadow-[0px_0px_4px_5px_#4a5ac240] cursor-pointer
          flex justify-center items-center">
        <div className="text-white">Send review</div>
    </div>
  )
}

export default SendReviewButton
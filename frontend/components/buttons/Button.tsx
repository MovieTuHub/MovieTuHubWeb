import React from 'react'

interface ButtonProps {
  width?: number;
  height?: number;
  fontSize?: number;
  text: string;
  onClick?: (e: any) => void;
}

const Button = ({
  width = 100,
  height = 50,
  fontSize = 16,
  text,
  onClick
}: ButtonProps) => {
  return (
    <div className="">
        <button
            style={{width : width, height: height}}
            onClick={onClick}
            className={`
                bg-background text-white rounded-[10] cursor-pointer select-none
                shadow-[0px_0px_10px_7px_#4a5ac240] transition-colors
                text-[${fontSize}px]
                hover:bg-[#4a5ac2] duration-200
                active:bg-[#707594] active:duration-75`}>
            {text}
        </button>
    </div>
  )
}

export default Button
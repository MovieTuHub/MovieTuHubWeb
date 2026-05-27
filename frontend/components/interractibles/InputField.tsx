import React from 'react'

interface InputFieldProps {
    type: string;
    fontSize?: number;
    isRounded?: boolean;
    placeholder?: string;
    onChange?: (e: any) => void;
}

const InputField = ({
    type,
    fontSize = 20,
    isRounded = false,
    placeholder = "",
    onChange
}: InputFieldProps) => {
  return (
    <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={
            `bg-white border border-black text-black px-4 transition-all duration-150
            hover:bg-[#d0d0d0] hover:shadow-[0px_0px_10px_5px_#4a5ac266]
            focus:bg-white focus:outline-none focus:shadow-[0px_0px_10px_5px_#4a5ac2cc]
            text-[${fontSize}px] ${isRounded ? "rounded-full" : ""}`
        }
    />
  )
}

export default InputField
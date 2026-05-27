import React, { ChangeEvent } from 'react'

interface InputFilesFieldProps {
    id: string;
    accept: string;
    text: string;
    multiple?: boolean;
    height?: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputFilesField = ({
    id,
    accept,
    text,
    multiple = false,
    height = 50,
    onChange
}: InputFilesFieldProps) => {
    return (
        <div>
            <input
                type="file"
                id={id}
                accept={accept}
                multiple={multiple}
                hidden
                onChange={onChange}
            />
            <label htmlFor={id}>
                <div
                    style={{height: height}}
                    className="cursor-pointer rounded-[10px]
                            bg-background shadow-[0px_0px_10px_5px_#4a5ac240]
                            flex items-center justify-center px-4
                            hover:bg-[#4a5ac2] active:bg-[#707594]">
                    {text}
                </div>
            </label>
        </div>
    )
}

export default InputFilesField
import React from 'react'

interface ListBoxProps {
    width: number;
    height: number;
    file: File | undefined
    textWhenEmpty: string;
    onClick: () => void;
}

const MainPageBox = ({
    width = 350,
    height = 300,
    file,
    textWhenEmpty,
    onClick
}: ListBoxProps) => {
    return (
        <div
            style={{ width: width, height: height }}
            className="bg-white rounded-lg border border-black px-3 py-2
                hover:shadow-[0px_0px_10px_5px_#4a5ac266] overflow-auto">
            <ul className="text-black flex flex-col gap-y-1">
                {
                    !file
                        ? <li>{textWhenEmpty}</li>
                        : (

                            <li

                                onClick={onClick}
                                className="border border-black rounded-lg px-4 h-10 flex items-center
                                        bg-[#e0e0e0] hover:bg-[#c8c8c8] active:bg-[#a0a0a0]"
                            >
                                <div>{file.name}</div>
                            </li>

                        )
                }
            </ul>
        </div>
    )
}

export default MainPageBox
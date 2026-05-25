import Image from 'next/image'
import React from 'react'

const CastBanner = ({
    width = 250, height = 450, src = "",
    firstName = "First name", lastName = "Last name", role = "Role"
}) => {
  return (
    <div
        style={{width: width, height: height}}
        className="
            flex flex-col rounded-lg overflow-hidden
            shadow-[0px_0px_8px_5px_#70759440]"
    >
        <Image
            alt="Cast banner"
            width={width}
            height={height * 0.7}
            src={src}
            className="aspect-50/63"
        />
        <div className="bg-[#4a5ac2] flex-1 flex flex-col p-[10]"
        >
            <div>
                <div className="text-white text-[22px] font-semibold">{firstName}</div>
                <div className="text-white text-[22px] font-semibold">{lastName}</div>
            </div>
            <div className="text-white text-[20px] mt-auto">{role}</div>
        </div>
    </div>
  )
}

export default CastBanner
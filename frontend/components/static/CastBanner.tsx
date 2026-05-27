import Image from 'next/image'
import React from 'react'

interface CastBannerProps {
    width?: number;
    height?: number;
    actorPhotoSrc: string;
    actorName: string;
    actorRole: string;
}

const CastBanner = ({
    actorPhotoSrc, actorName, actorRole
}: CastBannerProps) => {
    return (
        <div
            style={{ width: 200, height: 450 }}
            className="
            flex flex-col rounded-lg overflow-hidden
            shadow-[0px_0px_8px_5px_#70759440]"
        >
            <Image
                alt="Cast banner"
                width={200}
                height={175}
                src={actorPhotoSrc}
                className="aspect-2/3"
            />
            <div className="bg-[#4a5ac2] flex-1 flex flex-col p-[10]">
                <div className="text-white text-[22px] font-semibold">{actorName}</div>
                <div className="text-white text-[20px] mt-auto">{actorRole}</div>
            </div>
        </div>
    )
}

export default CastBanner
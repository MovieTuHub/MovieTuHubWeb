"use client"

import CloseButton from '@/components/buttons/CloseButton'
import { useEffect } from 'react'
import Image from "next/image"

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({
    isOpen, onClose
}: SidebarProps) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = "" };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#000000b3] text-white
            flex justify-start items-center z-100"
            onClick={onClose}
        >
            <div
                className="
                 flex flex-col
                 gap-y-30
                    pl-15
                    pt-1
                    bg-background
                        justify-left
                    h-screen w-150"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-row gap-x-3 shrink-0 ">
                    <div onClick={onClose}>
                        <CloseButton />
                    </div>
                    <a href="/" className="flex">
                        <Image
                            src='/MovieTuHub_new.png'
                            height={50}
                            width={200}
                            loading="eager"
                            alt="MovieTuHubs"
                            className="object-cover object-center scale-90"
                        />
                    </a>
                </div>
                <div className='flex flex-col gap-y-15 text-5xl pl-2 font-bold'>
                    <a href="/">Home</a>
                    <a href="/search">Search</a>
                    <a href="/add-movie">Create Movie</a>
                </div>
            </div>
        </div>
    )
}

export default LoginModal
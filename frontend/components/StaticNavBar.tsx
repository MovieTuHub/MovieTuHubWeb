"use client"

import { useState, useEffect } from 'react'
import Image from "next/image"
import { RxHamburgerMenu } from "react-icons/rx"
import MenuButton from "./buttons/MenuButton"
import NavBarButton from "./buttons/NavBarButton"
import SearchBar from "./interractibles/SearchBar"

const NavBar = ({logoHref = ""}) => {
    const [activeForm, setActiveForm] = useState<null | "login" | "signup" | "forgot">(null);

    return (
        <div className={`w-full py-1 px-15 z-50 fixed top-0 right-0 left-0
            bg-background hover:shadow-[0px_5px_5px_2px_#00000040]
            transition-all duration-200`}>
            <div className="flex flex-row justify-between items-center gap-x-2 max-h-12.5">
                <div className="flex flex-row gap-x-3 shrink-0">
                    <MenuButton />
                    <a href = {logoHref} className="flex">
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
                <div className="justify-self-center"><SearchBar /></div>
                <a href="/login-form"><NavBarButton text="Login" className="justify-self-end"/></a>
            </div>
        </div>
    )
}

export default NavBar
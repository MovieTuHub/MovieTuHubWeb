"use client"

import Image from "next/image"
import { useEffect, useState } from 'react'
import LoginModal from "../forms/LoginModal"
import SignUpModal from "../forms/SignUpModal"
import MenuButton from "./buttons/MenuButton"
import NavBarButton from "./buttons/NavBarButton"
import SearchBar from "./interractibles/SearchBar"

const NavBar = () => {
    const [activeModal, setActiveModal] = useState<null | "login" | "signup" | "forgot">(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className={`w-full py-1 px-15 z-50 fixed top-0 right-0 left-0
            transition-all duration-200
            ${isScrolled
                    ? "bg-background shadow-[0px_5px_5px_2px_#00000040]"
                    : "bg-transparent hover:bg-background hover:shadow-[0px_5px_5px_2px_#00000040]"
                }`}>
                <div className="flex flex-row justify-between items-center gap-x-2 max-h-12.5">
                    <div className="flex flex-row gap-x-3 shrink-0">
                        <MenuButton />
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
                    <div className="justify-self-center"><SearchBar /></div>
                    <div className="flex justify-self-end gap-x-5">
                        <a href="/add-movie-page"><NavBarButton text="Add movie" /></a>
                        <NavBarButton text="Login" onClick={() => { setActiveModal("login"); setIsModalOpen(true); }} />
                    </div>
                </div>
            </div>
            {
                activeModal == "login"
                    ? <LoginModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSwitchForm={(type) => setActiveModal(type as any)}
                    />
                    : <SignUpModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSwitchForm={() => setActiveModal("login")}
                    />
            }

        </>
    )
}

export default NavBar
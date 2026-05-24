import Image from "next/image"
import { RxHamburgerMenu } from "react-icons/rx"
import MenuButton from "./buttons/MenuButton"
import NavBarButton from "./buttons/NavBarButton"
import SearchBar from "./interractibles/SearchBar"

const NavBar = () => {
    return (
        <div className="w-full py-[6.5px] px-15 bg-background z-50 fixed top-0 right-0 left-0">
            <div className="flex flex-row justify-between items-center gap-x-2 max-h-12.5">
                <div className="flex flex-row gap-x-3 shrink-0">
                    <MenuButton />
                    <Image
                        src='/MovieTuHub_new.png'
                        height={50}
                        width={200}
                        loading="eager"
                        alt="MovieTuHubs"
                        className="object-cover object-center scale-90"
                />
                </div>
                <SearchBar />
                <NavBarButton text="Login" className="justify-self-end"/>
            </div>
        </div>
    )
}

export default NavBar
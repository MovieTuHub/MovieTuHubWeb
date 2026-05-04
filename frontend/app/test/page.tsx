import Image from "next/image"
import { RxHamburgerMenu } from "react-icons/rx";

const page = () => {
    return (
        <div className="w-full py-[6.5px] px-15.25 border-s-white border-2 z-50 fixed top-0 right-0">
            <div className="flex flex-row gap-x-4 max-h-12.5">
                <RxHamburgerMenu className="w-[50px] h-[50px]" />
                <Image
                    src='/MovieTuHub_new.png'
                    height={50}
                    width={162}
                    loading="eager"
                    alt="MovieTuHubs"
                    className="object-cover object-center scale-150"
                />
            </div>
        </div>
    )
}

export default page
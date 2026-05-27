import Image from 'next/image';

interface StreamButtonProps {
    width?: number;
    height?: number;
    href: string;
    streaming_service: string
}

const StreamButton = ({ width = 140, height = 50, href, streaming_service }: StreamButtonProps) => {

    let streaming_logo, alt_text

    switch (streaming_service) {
        case "Netflix":
            streaming_logo = "/Netflix_logo.png"
            alt_text = "Netflix logo"
            break
        case "Apple TV":
            streaming_logo = "/AppleTVLogo.png"
            alt_text = "Apple TV logo"
            break
        case "Disney +":
            streaming_logo = "/disney_logo_primary.jpeg"
            alt_text = "Disney + logo"
            break
        default:
            streaming_logo = "/generic_film_logo.png"
            alt_text = "Streaming Service"
    }

    return (
        <a href={href} style={{ width: width, height: height }}
            className="bg-background transition-colors
            hover:bg-[#4a5ac2] duration-200
            shadow-[0px_0px_4px_5px_#4a5ac240] rounded-[10]
            flex justify-evenly items-center cursor-pointer">
            <Image
                alt={alt_text}
                src={streaming_logo}
                width={height / 2}
                height={height / 2}
                className="text-white"
            />
            <div className="text-white">Stream Now</div>
        </a>
    )
}

export default StreamButton
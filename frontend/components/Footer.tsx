import React from 'react'
import TuVarnaLogo from './link_icons/TuVarnaLogo'
import FacebookIcon from './link_icons/FacebookIcon'
import InstagramIcon from './link_icons/InstagramIcon'
import YouTubeIcon from './link_icons/YouTubeIcon'
import Link from './buttons/Link'

const Footer = ({ width = "100%", height = 200 }) => {
    const gapWidth = Number(width) / 10;
    return (
        <div style={{ width: width, height: height }}
            className={`bg-background bottom-0 fixed text-white
            flex justify-around`}
        >
            <div className="flex flex-col justify-center gap-y-3">
                <Link href="" text="About Us" />
                <Link href="" text="Help and Support" />
                <Link href="" text="Contact Us" />
            </div>
            <div className="flex flex-col justify-center gap-y-3">
                <Link href="" text="FAQ" />
                <Link href="" text="Terms of Service" />
                <Link href="" text="Privacy Policy" />
            </div>
            <div className="flex flex-col justify-center items-center gap-y-7">
                <div className="text-4xl font-semibold">Follow Us</div>
                <div className="flex gap-x-4">
                    <TuVarnaLogo size={60} />
                    <FacebookIcon size={60} />
                    <InstagramIcon size={60} />
                    <YouTubeIcon size={60} />
                </div>
            </div>
        </div>
    )
}

export default Footer
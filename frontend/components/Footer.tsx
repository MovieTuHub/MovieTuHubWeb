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
            className={
                `bg-[#0c1446] bottom-0 text-white
                shadow-[0px_-5px_5px_2px_#00000040]
                flex justify-around z-40 select-none`
            }
        >
            <div className="flex flex-col justify-center gap-y-3 z-50">
                <Link href="/empty-page" text="About Us" />
                <Link href="/empty-page" text="Help and Support" />
                <Link href="/empty-page" text="Contact Us" />
            </div>
            <div className="flex flex-col justify-center gap-y-3 z-50">
                <Link href="/faq-page" text="FAQ" />
                <Link href="/empty-page" text="Terms of Service" />
                <Link href="/empty-page" text="Privacy Policy" />
            </div>
            <div className="flex flex-col justify-center items-center gap-y-7 z-50">
                <div className="text-4xl font-semibold">Follow Us</div>
                <div className="flex gap-x-4">
                    <TuVarnaLogo size={60} href="https://www1.tu-varna.bg/tu-varna/index.php" />
                    <FacebookIcon size={60} href="https://www.facebook.com/tu.varna" />
                    <InstagramIcon size={60} href="https://www.instagram.com/tu.varna" />
                    <YouTubeIcon size={60} href="https://www.youtube.com/channel/UCd6X--9_fp-fFmBepwDTrfQ" />
                </div>
            </div>
        </div>
    )
}

export default Footer
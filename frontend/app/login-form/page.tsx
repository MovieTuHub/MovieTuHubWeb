import Button from '@/components/buttons/Button'
import Link from '@/components/buttons/Link'
import CheckBox from '@/components/interractibles/CheckBox'
import React from 'react'

const page = () => {
    return (
        <div className="
            w-screen h-screen bg-[#000000b3] text-white
            flex justify-center items-center"
        >
            <div style={{ width: 500, height: 550, borderRadius: 30 }}
                className="bg-background shadow-[0px_0px_20px_10px_#4a5ac240]
                    flex flex-col justify-center items-center gap-y-10"
            >
                <div className="text-6xl font-bold">Login</div>
                <div className="flex flex-col justify-center items-center gap-y-3">
                    Email
                    <input type="text"
                        className="w-62.5 rounded-full border-2 border-black
                            bg-white hover:bg-[#c0c0c0]
                            focus:outline-0 placeholder:Email"
                    />
                    Password
                    <input type="text"
                        className="w-62.5 rounded-full border-2 border-black
                            bg-white hover:bg-[#c0c0c0]
                            focus:outline-0 placeholder:Email"
                    />
                </div>
                <div className="flex flex-col items-center gap-y-6">
                    <div className="flex gap-x-32">
                        <div className="flex items-center gap-x-2 text-black">
                            <CheckBox size={20}/>
                            <div className="text-white">Remember me</div>
                        </div>
                        <Link href="/fogot-password-form" text="Forgot password?" fontSize={16} isUnderlined/>
                    </div>
                    <Button text="Login"/>
                    <Link href="/sign-up-form" fontSize={16} textIsCentered isUnderlined>
                        Don't have an account?<br />Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page
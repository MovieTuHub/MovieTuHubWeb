import Button from '@/components/buttons/Button'
import CloseButton from '@/components/buttons/CloseButton'
import Link from '@/components/buttons/Link'
import React from 'react'

const page = () => {
    return (
        <div className="
            w-screen h-screen bg-[#000000b3] text-white
            flex justify-center items-center"
        >
            <div style={{ width: 500, height: 550, borderRadius: 30 }}
                className="bg-background shadow-[0px_0px_20px_10px_#4a5ac240]
                    flex flex-col justify-center items-center gap-y-16"
            >
                <a href="/forms/login-form"
                    className="absolute top-41.25 right-133.75">
                    <CloseButton />
                </a>
                <div className="text-4xl font-bold">Reset password</div>
                <div className="flex flex-col gap-y-8 mb-4">
                    <div className="flex flex-col justify-center items-center gap-y-3">
                        <div className="text-[20px]">New password</div>
                        <input type="password"
                            className={`w-62.5 h-7.5 rounded-full border-2 border-black
                                bg-white hover:bg-[#c0c0c0]
                                focus:outline-0 placeholder:${"New password"}
                                text-black px-3`
                            }
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-y-3">
                        <div className="text-[20px]">Confirm password</div>
                        <input type="password"
                            className={`w-62.5 h-7.5 rounded-full border-2 border-black
                                bg-white hover:bg-[#c0c0c0]
                                focus:outline-0 placeholder:${"Confirm password"}
                                text-black px-3`
                            }
                        />
                    </div>
                </div>
                <a href="/forms/login-form"><Button width={150} text="Reset password" /></a>
            </div>
        </div>
    )
}

export default page
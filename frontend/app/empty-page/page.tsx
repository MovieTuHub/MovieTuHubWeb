import Button from '@/components/buttons/Button'
import React from 'react'

const page = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-y-20
        ">
            <div className="text-6xl text-white font-bold">Still in development...</div>
            <a href="/main-page">
                <Button
                    width={250}
                    height={70}
                    fontSize={24}
                    text="Back to main page"
                />
            </a>
        </div>
    )
}

export default page
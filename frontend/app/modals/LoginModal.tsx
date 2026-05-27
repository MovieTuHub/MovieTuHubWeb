"use client"

import Button from '@/components/buttons/Button'
import CheckBox from '@/components/interractibles/CheckBox'
import CloseButton from '@/components/buttons/CloseButton'
import React, { useEffect } from 'react'

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchForm?: (formType: "signup" | "forgot-confirm-email") => void;
    onClickLogin: () => void;
}

const LoginModal = ({
    isOpen, onClose, onSwitchForm, onClickLogin
}: LoginModalProps) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = "" };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 w-screen h-screen bg-[#000000b3] text-white
            flex justify-center items-center z-100"
            onClick={onClose}
        >
            <div style={{ width: 500, height: 550, borderRadius: 30 }}
                className="bg-background shadow-[0px_0px_20px_10px_#4a5ac240]
                    flex flex-col justify-center items-center gap-y-10 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div onClick={onClose} className="absolute top-6 right-6">
                    <CloseButton />
                </div>
                <div className="text-6xl font-bold">Login</div>
                <div className="flex flex-col gap-y-5">
                    <div className="flex flex-col justify-center items-center gap-y-3">
                        <div className="text-[20px]">Email</div>
                        <input type="text"
                            className="w-62.5 h-7.5 rounded-full border-2 border-black
                                bg-white hover:bg-[#c0c0c0]
                                focus:outline-0 text-black px-3"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-y-3">
                        <div className="text-[20px]">Password</div>
                        <input type="password"
                            className="w-62.5 h-7.5 rounded-full border-2 border-black
                                bg-white hover:bg-[#c0c0c0]
                                focus:outline-0 text-black px-3"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-y-6">
                    <div className="flex gap-x-32">
                        <div className="flex items-center gap-x-2 text-black">
                            <CheckBox size={20} />
                            <div className="text-white">Remember me</div>
                        </div>
                        <div
                            onClick={() => onSwitchForm?.("forgot-confirm-email")}
                            className="text-white underline transition-colors
                            hover:text-[#4a5ac2] duration-200 cursor-pointer
                            active:text-[#707594] active:duration-75">
                            Forgot password?
                        </div>
                    </div>
                    <Button text="Login" onClick={onClickLogin} />
                    <div onClick={() => onSwitchForm?.("signup")}>
                        <div className="text-[16px] text-center underline cursor-pointer
                            hover:text-[#4a5ac2] active:text-[#707594]">
                            Don't have an account?<br />Sign up
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal
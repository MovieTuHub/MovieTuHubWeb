import Button from '@/components/buttons/Button'
import CloseButton from '@/components/buttons/CloseButton'
import React, { useEffect } from 'react'

interface ForgotPasswordChangeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchForm?: (formType: "login") => void;
}

const ForgotPasswordChangeModal = ({
    isOpen, onClose, onSwitchForm
}: ForgotPasswordChangeModalProps) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = "" };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0
            w-screen h-screen bg-[#000000b3] text-white
            flex justify-center items-center z-100"
            onClick={onClose}
        >
            <div style={{ width: 500, height: 550, borderRadius: 30 }}
                className="bg-background shadow-[0px_0px_20px_10px_#4a5ac240]
                    flex flex-col justify-center items-center gap-y-16"
                onClick={(e) => e.stopPropagation()}
            >
                <div onClick={() => onSwitchForm?.("login")}
                    className="absolute top-41.25 right-133.75">
                    <CloseButton />
                </div>
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
                <Button width={150} text="Reset password" onClick={() => onSwitchForm?.("login")}/>
            </div>
        </div>
    )
}

export default ForgotPasswordChangeModal
import Button from '@/components/buttons/Button'
import CloseButton from '@/components/buttons/CloseButton'
import React, { useEffect } from 'react'

interface ForgotPasswordConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onForward: () => void;
    onBack: () => void;
}

const ForgotPasswordConfirmModal = ({
    isOpen, onClose, onForward, onBack
}: ForgotPasswordConfirmModalProps) => {
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
                    flex flex-col justify-center items-center gap-y-10"
                onClick={(e) => e.stopPropagation()}
            >
                <div onClick={() => onBack()}
                    className="absolute top-41.25 right-133.75">
                    <CloseButton />
                </div>
                <div className="text-4xl font-bold">Reset password</div>
                <div className="flex flex-col gap-y-5">
                    <div className="flex flex-col justify-center items-center gap-y-3">
                        <div className="text-[20px]">Email</div>
                        <input type="text"
                            className={`w-62.5 h-7.5 rounded-full border-2 border-black
                                bg-white hover:bg-[#c0c0c0]
                                focus:outline-0 placeholder:${"Email"}
                                text-black px-3`
                            }
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-y-3">
                        <div className="text-[20px]">Confirmation code</div>
                        <input type="text"
                            className={`w-62.5 h-7.5 rounded-full border-2 border-black
                                bg-white hover:bg-[#c0c0c0]
                                focus:outline-0 placeholder:${"Code"}
                                text-black px-3`
                            }
                        />
                    </div>
                </div>
                <div className="text-white transition-colors cursor-pointer
                    hover:text-[#4a5ac2] duration-200 text-center underline
                    active:text-[#707594] active:duration-75">
                    Did not recieve the code?<br />Resend code
                </div>
                <Button text="Continue" onClick={() => onForward()} />
            </div>
        </div>
    )
}

export default ForgotPasswordConfirmModal
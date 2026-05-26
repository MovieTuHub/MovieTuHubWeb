import Button from '@/components/buttons/Button'
import CheckBox from '@/components/interractibles/CheckBox'
import CloseButton from '@/components/buttons/CloseButton'
import React, { useEffect } from 'react'

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchForm?: (formType: "login" | "forgot") => void;
}

const page = ({
  isOpen, onClose, onSwitchForm
}: SignUpModalProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = "" };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed w-screen h-screen bg-[#000000b3] text-white
      flex justify-center items-center z-100"
      onClick={onClose}
    >
      <div style={{ width: 500, height: 600, borderRadius: 30 }}
        className="bg-background shadow-[0px_0px_20px_10px_#4a5ac240]
          flex flex-col justify-center items-center gap-y-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div onClick={(e) => { e.stopPropagation(); onSwitchForm?.("login"); }}
          className="absolute top-35 right-133.75">
          <CloseButton />
        </div>
        <div className="text-6xl font-bold">Sign Up</div>
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
            <div className="text-[20px]">Username</div>
            <input type="text"
              className={`w-62.5 h-7.5 rounded-full border-2 border-black
                bg-white hover:bg-[#c0c0c0]
                focus:outline-0 placeholder:${"Username"}
                text-black px-3`
              }
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-y-3">
            <div className="text-[20px]">Password</div>
            <input type="password"
              className={`w-62.5 h-7.5 rounded-full border-2 border-black
                bg-white hover:bg-[#c0c0c0]
                focus:outline-0 placeholder:${"Password"}
                text-black px-3`
              }
            />
          </div>
        </div>
        <div className="flex items-center gap-x-2 text-black">
          <CheckBox size={20} />
          <div className="text-white">Remember me</div>
        </div>
        <div onClick={onClose}>
          <Button text="Sign up" />
        </div>
      </div>
    </div>
  )
}

export default page
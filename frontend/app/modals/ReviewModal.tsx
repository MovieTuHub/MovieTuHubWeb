import Button from '@/components/buttons/Button';
import CloseButton from '@/components/buttons/CloseButton';
import StarRating from '@/components/interractibles/StarRating';
import React from 'react'

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ReviewModal = ({
    isOpen, onClose
}: ReviewModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 w-screen h-screen bg-[#000000b3] text-white
            flex justify-center items-center z-60"
            onClick={onClose}>
            <div style={{width: 620, height: 480, borderRadius: 20}}
                onClick={(e) => e.stopPropagation()}
                className="bg-background shadow-[0px_0px_15px_10px_#4a5ac240]
                    flex flex-col items-center justify-between py-5 text-[20px]">
                <div className="flex flex-col items-center justify-center gap-y-3">
                    <div>What rating do you give this movie?</div>
                    <StarRating starSize={28}/>
                </div>
                <div className="flex flex-col items-center gap-y-5">
                    <div>Tell us what you think</div>
                    <input type="text" placeholder="Title"
                        className="bg-white border border-black text-black px-4 transition-all duration-150
                            hover:bg-[#d0d0d0] hover:shadow-[0px_0px_10px_5px_#4a5ac266]
                            focus:bg-white focus:outline-none focus:shadow-[0px_0px_10px_5px_#4a5ac2cc]
                            text-[20px] rounded-lg w-112.5"
                    />
                    <textarea placeholder="Write your review here"
                        style={{width: 450, height: 130}}
                        className="bg-white text-black rounded-lg px-4 py-1
                            hover:bg-[#d0d0d0] hover:shadow-[0px_0px_10px_5px_#4a5ac266]
                            focus:bg-white focus:outline-none focus:shadow-[0px_0px_10px_5px_#4a5ac2cc]">
                    </textarea>
                </div>
                <Button text="Send Review" width={130}/>
                <div className="absolute ml-133.75" onClick={onClose}>
                    <CloseButton />
                </div>
            </div>
        </div>
    )
}

export default ReviewModal
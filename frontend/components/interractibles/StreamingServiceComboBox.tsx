
interface ComboBoxProps {
    width?: number;
    height?: number;
    fontSize?: number;
    label: string;
    // value: SimpleActorResponse;
    defaultText: string;
    onChange: (e: string) => void;
}

enum StreamingServiceEnum {
    NETFLIX = "Netflix",
    APPLE_TV = "Apple TV",
    DISNEY_PLUS = "Disney +"
}

const StreamingSeriveComboBox = ({
    width = 260,
    height = 30,
    fontSize = 20,
    label,
    // value,
    defaultText,
    onChange
}: ComboBoxProps) => {

    return (
        <div className="flex flex-col items-center gap-y-3">
            <div className={`text-[${fontSize}px] font-semibold`}>{label}</div>
            <select
                style={{ width: width, height: height }}
                // value={value.name}
                onChange={(e) => onChange(e.target.value)}
                className="bg-white text-black px-4
                    rounded-full transition-all duration-150
                    hover:bg-[#d0d0d0] hover:shadow-[0px_0px_10px_5px_#4a5ac266]
                    focus:bg-white focus:outline-none focus:shadow-[0px_0px_10px_5px_#4a5ac2cc]">
                <option value="">{defaultText}</option>
                <option value={StreamingServiceEnum.NETFLIX}>{StreamingServiceEnum.NETFLIX}</option>
                <option value={StreamingServiceEnum.APPLE_TV}>{StreamingServiceEnum.APPLE_TV}</option>
                <option value={StreamingServiceEnum.DISNEY_PLUS}>{StreamingServiceEnum.DISNEY_PLUS}</option>
                <option value="None">None</option>

            </select>
        </div>
    )
}

export default StreamingSeriveComboBox
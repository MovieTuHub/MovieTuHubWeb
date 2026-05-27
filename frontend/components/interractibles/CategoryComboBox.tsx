
interface ComboBoxProps {
    width?: number;
    height?: number;
    fontSize?: number;
    label: string;
    defaultText: string;
    array: Array<CategoryResponse>;
    onChange: (e: string) => void;
}

const CategoryComboBox = ({
    width = 260,
    height = 30,
    fontSize = 20,
    label,
    defaultText,
    array,
    onChange
}: ComboBoxProps) => {
    return (
        <div className="flex flex-col items-center gap-y-3">
            <div className={`text-[${fontSize}px] font-semibold`}>{label}</div>
            <select
                style={{ width: width, height: height }}
                onChange={(e) => onChange(e.target.value)}
                className="bg-white text-black px-4
                    rounded-full transition-all duration-150
                    hover:bg-[#d0d0d0] hover:shadow-[0px_0px_10px_5px_#4a5ac266]
                    focus:bg-white focus:outline-none focus:shadow-[0px_0px_10px_5px_#4a5ac2cc]">
                <option value="">{defaultText}</option>
                {
                    array.map((element, index) => (
                        <option key={index} value={element.id}>{element.category}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default CategoryComboBox
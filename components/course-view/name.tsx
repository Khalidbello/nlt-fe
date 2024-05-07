import Image from "next/image";

interface NameProps {
    name: string;
}

const Name: React.FC<NameProps> = ({ name }) => {
    return (
        <div className="mb-4 px-4">
            <h2 className="mb-2 font-bold text-xl">{name}</h2>
            <div className="mx-2 rounded-xl bg-blue-200 h-[15rem]">
            </div>
            <div>
                <span></span>
            </div>
        </div>

    )
}

export default Name;
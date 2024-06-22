import { faGreaterThan, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import showClicked from '@/app/utils/clicked';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React, { useRef } from "react";


interface childType {
    icon: IconProp;
    text: string;
    icon2: IconProp;
    color: string;
    action: React.Dispatch<React.SetStateAction<boolean>>;
}

interface accountType {
    name: string,
    childs: childType[],
}

const SettingsFormer: React.FC<{ data: accountType }> = ({ data }) => {
    return (
        <div className="px-4 mt-14">
            <div className="text-gray-600 font-semibold">{data.name}</div>
            <div className="shadow-sm shadow-gray-300 rounded-xl px-5 py-2 mt-2 flex flex-col gap-y-5 items-start justify-center">
                {data.childs.map((ele, index) => <Child key={index} data={ele} />)}
            </div>
        </div>
    )
}

interface ChildProps {
    data: childType;
}

const Child: React.FC<ChildProps> = ({ data }) => {
    const btRef = useRef<null | HTMLButtonElement>(null);

    const handleClick = () => {
        if (btRef.current) showClicked(btRef.current);
        setTimeout(() => data.action(true), 250);
    };

    return (
        <div className=" flex justify-between items-center w-full">
            <div className="flex justify-start items-center gap-x-4">
                <FontAwesomeIcon icon={data.icon} className={`w-4 h-4 bg-blue-50 ${data.color}`} />
                {data.text}
            </div>
            <button
                ref={btRef}
                onClick={handleClick}
            >
                <FontAwesomeIcon icon={data.icon2} className="w-4 h-4 p-2 rounded-xl bg-blue-100 text-blue-400" />
            </button>
        </div>
    )
};

export default SettingsFormer;

export type { accountType }
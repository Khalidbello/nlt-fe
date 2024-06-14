import showClicked from "@/app/utils/clicked";
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useRef } from "react";

interface AddQuizBtProps {
    show: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddQuizBt: React.FC<AddQuizBtProps> = ({ show }) => {
    const btRef = useRef<HTMLButtonElement | null>(null);

    const handleClick = () => {
        if (btRef.current) showClicked(btRef.current); 
        setTimeout(() => show(true), 250);
    };

    return (
        <button
            ref={btRef}
            onClick={handleClick}
            className="fixed bottom-3 right-2 px-4 py-2 rounded-full bg-blue-500 text-white border-[1px] border-white"
        >
            <FontAwesomeIcon icon={faPlus} className="w-5 h-5 pr-1" />
            Add quiz
        </button>
    );
};

export default AddQuizBt;
'use client';

import showClicked from "@/app/utils/clicked";
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef } from "react";

const AddLectureBt: React.FC<{ show: React.Dispatch<React.SetStateAction<boolean>> }> = ({ show }) => {
    const btRef = useRef<HTMLButtonElement | null>(null);

    const handleClick = () => {
        if (btRef.current) showClicked(btRef.current);
        setTimeout(() => show(true), 250);
    };

    return (
        <button
            ref={btRef}
            onClick={handleClick}
            className="fixed bottom-4 right-2 bg-blue-500 text-white px-4 py-2 rounded-full"
        >
            <FontAwesomeIcon icon={faPlus} className="text-white w-5 h-5" /> Add Lesson
        </button>
    )
}


export default AddLectureBt;
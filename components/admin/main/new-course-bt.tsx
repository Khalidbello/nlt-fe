import showClicked from "@/app/utils/clicked";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";

interface CreateCourseBt {
    show: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCourseBt: React.FC<CreateCourseBt> = ({ show }) => {
    const createCourseBtRef = useRef<null | HTMLButtonElement>(null);

    const handleClick = () => {
        if (createCourseBtRef.current) showClicked(createCourseBtRef.current);
        setTimeout(() => show(true), 250);
    };

    return (
        <button
            ref={createCourseBtRef}
            onClick={handleClick}
            className="fixed bottom-2 right-2 px-4 py-2 rounded-full bg-blue-500 text-white border-[1px] border-white">
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" /> New course
        </button>
    )
}

export default CreateCourseBt;
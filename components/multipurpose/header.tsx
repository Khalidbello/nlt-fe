'use client';

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import showClicked from '@/app/utils/clicked';
import { useRouter } from "next/navigation";
import { useRef } from "react";

const Header: React.FC<{ heading: string }> = ({ heading }) => {
    const router = useRouter();
    const backBt = useRef<null | HTMLButtonElement>(null);

    const back = () => {
        showClicked(backBt);
        setTimeout(() => router.back(), 250);
    };

    return (
        <header className="fixed top-0 lfet-0 bg-white flex items-center justify-start gap-4 w-full px-2 py-2 border-b-2 border-b-gray-100">
            <button ref={backBt} onClick={back}>
                <FontAwesomeIcon icon={faArrowLeft} className="bg-blue-500 p-2 text-white w-[1rem] h-[1rem] rounded-md" />
            </button>
            <span className="font-semibold">{heading}</span>
        </header>
    )
}


export default Header;
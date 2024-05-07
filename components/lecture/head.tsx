'use client';

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation";
import showClicked from '@/app/utils/clicked';
import { useRef } from "react";

const Head: React.FC = () => {
    const router = useRouter();
    const backBt = useRef<null | HTMLButtonElement>(null);

    const back = () => {
        showClicked(backBt);
        setTimeout(() => router.back(), 250);
    };

    return (
        <header className="fixed top-0 left-0 z-50 bg-white w-full p-4 border-b border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <button ref={backBt} onClick={back}>
                    <FontAwesomeIcon icon={faArrowLeft} className="bg-blue-500 p-2 text-white w-[1rem] h-[1rem] rounded-md" />
                </button>
                <span className="font-semibold">Lectures</span>
            </div>
            <div className="flex gap-4 items-center">
                <span>Chapter 4</span>
                <span className="text-sm">Lesson 2</span>
            </div>
        </header>
    )
};

export default Head;

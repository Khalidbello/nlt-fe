'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

type childprops = {
    name: string
};

export default function Head() {
    const [userName, setUserName] = useState<string>('');

    useEffect(() => {
        setTimeout(() => setUserName('Khalid'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [null]);

    return (
        <div className="flex justify-between items-center border-b-[1px] border-b-blue-100 px-5 py-2 fixed bg-white w-full top-0 left-0 z-40">
            <div className="inline-flex gap-2 items-center">
                <FontAwesomeIcon icon={faUser} className="h-5 w-5 p-2 text-blue-600 rounded-xl" />
                <span className="text-sm font-medium">Welcome, {userName}</span>
            </div>
            <FontAwesomeIcon icon={faBell} className="h-4 w-4 text-white p-2 bg-blue-600 rounded-xl" />
        </div>
    )
}
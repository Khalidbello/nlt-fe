'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import showClicked from "@/app/utils/clicked";
import { useRouter } from "next/navigation";

type childprops = {
    name: string
};

export default function Head() {
    const router = useRouter();
    const [userName, setUserName] = useState<string>('');
    const profileBtRef = useRef<null | HTMLButtonElement>(null);
    const notBtRef = useRef<null | HTMLButtonElement>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    // fucntion to redirect user 
    const redirect = (ref: any, url: string) => {
        showClicked(ref);
        setTimeout(() => router.push(url), 210);
    }
    // function to get user first name
    const getFistName = async () => {
        try {
            const response = await fetch(`${apiHost}/users/profile`, { credentials: 'include' });
            if (response.status === 200) {
                const data = await response.json();
                setUserName(data.first_name);
            };
        } catch (err) {
            console.error('error in head', err);
        };
    };

    useEffect(() => {
        getFistName();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex justify-between items-center border-b-[1px] border-b-blue-100 px-5 py-2 fixed bg-white w-full top-0 left-0 z-40">
            <div className="inline-flex gap-2 items-center">
                <button onClick={() => redirect(profileBtRef, 'profile')} ref={profileBtRef}>
                    <FontAwesomeIcon icon={faUser} className="h-5 w-5 p-2 text-blue-600 rounded-xl" />
                </button>
                <span className="text-sm font-medium">Welcome, {userName}</span>
            </div>
            <button onClick={() => redirect(notBtRef, '/notification')} ref={notBtRef}>
                <FontAwesomeIcon icon={faBell} className="h-4 w-4 text-white p-2 bg-blue-600 rounded-xl" />
            </button>
        </div>
    )
}
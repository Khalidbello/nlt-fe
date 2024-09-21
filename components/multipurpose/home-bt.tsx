'use client'

import showClicked from "@/app/utils/clicked";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const HomeBt = () => {
    const router = useRouter();
    const btRef = useRef<null | HTMLButtonElement>(null);
    const push = () => {
        if (btRef.current) {
            showClicked(btRef.current);
            setTimeout(() => router.push('/home'), 200);
        };
    };

    return (
        <button className="fixed bottom-3 left-3 bg-blue-100 w-6 h-6 rounded-xl flex items-center justify-center">
            <FontAwesomeIcon icon={faHome} className="w-4 h-4 text-blue-500" />
        </button>
    );
};


export default HomeBt;
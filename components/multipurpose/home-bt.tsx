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
        <button onClick={push} ref={btRef} className="fixed bottom-3 left-4 bg-blue-100 w-9 h-9 rounded-xl flex items-center justify-center z-50">
            <FontAwesomeIcon icon={faHome} className="w-5 h-5 text-blue-500" />
        </button>
    );
};


export default HomeBt;
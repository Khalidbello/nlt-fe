'use client';

import showClicked from "@/app/utils/clicked";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Loader from "../multipurpose/loader";

interface ConfirmLogoutProps {
    hide: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmLogout: React.FC<ConfirmLogoutProps> = ({ hide }) => {
    const router = useRouter();
    const cancleBtRef = useRef<null | HTMLButtonElement>(null);
    const yesBtRef = useRef<null | HTMLButtonElement>(null);
    const [showError, setShowError] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const cancle = () => {
        showClicked(cancleBtRef);
        setTimeout(() => hide(false), 210);
    }

    const yes = async () => {
        try {
            setShowError(false);
            setShowLoader(true);

            const response = await fetch(`${apiHost}/users/logout`, { credentials: 'include' });

            if (response.status === 200 || response.status === 403) {
                router.push('/sign-ingit');
            } else {
                throw 'something went wrong';
            }
        } catch (err) {
            setShowError(true)
        } finally {

        }
    }
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-blue-500 bg-opacity-90 flex items-center justify-center z-50">
            <p className="bg-white rounded-xl p-5">
                <p>Are you sure you want to logout ?</p>
                <div className="text-right space-x-5 mt-8">
                    <button
                        ref={yesBtRef}
                        onClick={yes}
                        className="bg-red-100 text-red-500 rounded-full px-4 py-2"
                    >{showLoader ? <Loader h='h-[1rem]' /> : 'Yes'}</button>

                    <button
                        ref={cancleBtRef}
                        onClick={cancle}
                        className="bg-blue-100 text-blue-500 rounded-full px-4 py-2"
                    >No</button>
                </div>
            </p>
        </div>
    )
}

export default ConfirmLogout;
'use client';

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import showClick from '@/app/utils/clicked';
import { useEffect, useRef, useState } from "react";
import Loader from '@/components/multipurpose/loader';
import RollerAnimation from "../multipurpose/roller-white";
import { useRouter } from "next/navigation";

interface enrollProps {
    courseId: number;F
    hide: React.Dispatch<React.SetStateAction<boolean>>;
    options: 1 | 2 | 3;
}

const EnrollmentOpt: React.FC<enrollProps> = ({ courseId, hide, options = 3 }) => {
    const cancleBtRef = useRef<null | HTMLButtonElement>(null);
    const [price, setPrice] = useState<number>(5);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [startFreeLoading, setStartFreeLoading] = useState<boolean>(false);
    const freeBtRef = useRef<null | HTMLButtonElement>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const router = useRouter();

    console.log('options numbr', options);

    const handleHide = () => {
        showClick(cancleBtRef)
        setTimeout(() => {
            if (hide) hide(false);
        }, 250);
    }

    const handleEnrollFree = async () => {
        try {
            showClick(freeBtRef);
            setStartFreeLoading(true);
            const response = await fetch(`${apiHost}/users/enroll-free/${courseId}`, { credentials: 'include' });

            if (response.status === 200) {
                router.push('/my-learning');
                console.log('course enrlled free succesfully');
            }
        } catch (err) {
            setShowError(true);
        } finally {
            setStartFreeLoading(false)
        }
    };

    const fetchPrice = async () => {
        try {
            const response = await fetch(`${apiHost}/users/get-price/${courseId}`, { credentials: 'include' });

            if (response.status === 200) {
                const data = await response.json();
                console.log('in nerllment opt ', data.price)
                setPrice(data.price)
            } else {
                throw 'something went wrong'
            }
        } catch (err) {
            setShowError(true)
        } finally {
            setShowLoader(false)
        }
    };

    useEffect(() => {
        fetchPrice();
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-blue-500 bg-opacity-90 flex justify-center items-center">
            <div className="relative bg-white rounded-xl p-4 pt-12 m-6">
                {showLoader ? (
                    <Loader h='h-[6rem]' />
                ) : (
                    <>
                        {options > 2 && (
                            <button ref={cancleBtRef} onClick={handleHide} className="absolute top-2 right-2 bg-red-100 flex items-center justify-center rounded-full w-7 h-7">
                                <FontAwesomeIcon icon={faX} className="text-red-500 h-4 w-4" />
                            </button>
                        )}

                        {showError ? (
                            <div className="text-sm text-red-500 text-center p-4">Something went wrong please try again</div>
                        ) : (
                            <>
                                {options < 3 && <p>Complete payment to continue course</p>}

                                <p className="text-xl font-medium mb-6">Price: $ {price}</p>
                                {options > 2 && (
                                    <button
                                        ref={freeBtRef}
                                        disabled={startFreeLoading}
                                        onClick={handleEnrollFree}
                                        className="inline-block bg-blue-500 text-whte w-full text-center text-white py-2 px-4 mb-5 rounded-xl">
                                        {startFreeLoading ? <RollerAnimation h='h-[1.5rem]' /> : ('Start Free  $0')}
                                    </button>
                                )}

                                {options > 1 && (
                                    <>
                                        <button className="inline-block bg-blue-500 text-whte w-full text-center text-white py-2 px-4 mb-5 rounded-xl">Pay Half ${Math.floor(price * 0.5)}</button>
                                        <button className="inline-block bg-blue-500 text-whte w-full text-center text-white py-2 px-4 mb-45 rounded-xl">
                                            Pay Full ${price - price * 0.005} <span className="text-xs bg-green-600 rounded-full px-2 py-1 mx-3">5% discout</span>
                                        </button>
                                    </>
                                )}
                            </>
                        )}

                    </>
                )
                }
            </div >
        </div >
    )
}

export default EnrollmentOpt;
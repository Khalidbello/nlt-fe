import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import showClick from '@/app/utils/clicked';
import { useEffect, useRef, useState } from "react";
import Loader from '@/components/multipurpose/loader';

interface enrollProps {
    courseId: number;
    hide: React.Dispatch<React.SetStateAction<boolean>>;
}

const EnrollmentOpt: React.FC<enrollProps> = ({ courseId, hide }) => {
    const cancleBtRef = useRef<null | HTMLButtonElement>(null);
    const [price, setPrice] = useState<number>(5);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const handleHide = () => {
        showClick(cancleBtRef)
        setTimeout(() => hide(false), 250);
    }

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
                        <button ref={cancleBtRef} onClick={handleHide} className="absolute top-2 right-2 bg-red-100 flex items-center justify-center rounded-full w-7 h-7">
                            <FontAwesomeIcon icon={faX} className="text-red-500 h-4 w-4" />
                        </button>

                        {showError ? (
                            <div className="text-sm text-red-500 text-center p-4">Something went wrong please try again</div>
                        ) : (
                            <>
                                <p className="text-xl font-medium mb-4">Price: $ {price}</p>
                                <button className="inline-block bg-blue-500 text-whte w-full text-center text-white py-2 px-4 mb-4 rounded-xl">Start Free</button>
                                <button className="inline-block bg-blue-500 text-whte w-full text-center text-white py-2 px-4 mb-4 rounded-xl">Pay Half</button>
                                <button className="inline-block bg-blue-500 text-whte w-full text-center text-white py-2 px-4 mb-4 rounded-xl">
                                    Pay Full <span className="text-xs bg-green-600 rounded-full px-3 py-1">5% discout</span>
                                </button>
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
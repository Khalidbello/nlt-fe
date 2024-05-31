'use client';

import { faCopy, faExclamation, faExclamationTriangle, faFrownOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Loader from "../multipurpose/loader";
import { icon } from "@fortawesome/fontawesome-svg-core";
import showClick from '@/app/utils/clicked';

interface dataType {
    courseName: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    amount: number;
}
const AccountDetails = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showError, setShowError] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const [copied, setCopied] = useState<boolean>(false);
    const [data, setData] = useState<dataType>({
        courseName: 'Financial literacy 101',
        accountName: 'Flutterwave',
        accountNumber: '293576757',
        bankName: 'Wema Bank',
        amount: 5000,
    });
    const courseId = searchParams.get('courseId');
    const paymentType = searchParams.get('type');
    const copyBtRef = useRef<null | HTMLButtonElement>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const copyAccountNumber = async () => {
        if (!navigator.clipboard) {
            console.error("Clipboard API not supported");
            return;
        }

        try {
            showClick(copyBtRef);
            await navigator.clipboard.writeText(data.accountNumber);
            setCopied(true);
        } catch (err) {
            console.error("Error copying to clipboard:", err);
        } finally {
            setTimeout(() => setCopied(false), 2000); // Optional: Clear copied state after a timeout
        }
    };

    const fetchPaymentInfo = async () => {
        try {
            ``
            if (paymentType !== 'full' && paymentType !== 'half' && paymentType !== 'completeHalf' || !courseId) throw 'Incomplete data to process';

            setShowLoader(true);

            const response = await fetch(`${apiHost}/gateway/generate-account-number/${courseId}/${paymentType}`, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.status === 200) {
                const paymentInfo = await response.json();
                setData(paymentInfo)
            } else if (response.status === 403) {
                router.push('/sign-in?redirect=true');
            } else {
                throw 'somethin went wrong';
            }
        } catch (err) {
            console.log('erorr in make payment', err);
            setShowError(true);
        } finally {
            setShowLoader(false)
        }
    };

    useEffect(() => {
        fetchPaymentInfo()
    }, []);

    return (
        <>
            {showLoader ? (
                <div className="w-full h-[90%] flex items-center justify-center">
                    <Loader h='h-[6rem]' />
                </div>
            ) : (showError ? (
                <div className="flex items-center justify-center p-6 w-full pt-20">
                    <div className="bg-red-100 px-4 py-8 rounded-md shadow-md mt-10">
                        <div className="flex items-center justify-center mb-4">
                            <FontAwesomeIcon icon={faFrownOpen} size="lg" className="text-blue-500" />
                        </div>
                        <h2 className="text-xl font-medium text-gray-800 mb-2">
                            Oops! Something went wrong.
                        </h2>
                        {/* {errorMessage && <p className="text-gray-600">{errorMessage}</p>} */}
                        {/* <button className="btn-primary mt-4">Try Again</button> */}
                    </div>
                </div>
            ) : (
                <div className="mt-20 px-3">
                    <h3 className="pl-2 mb-4"><span className="font-medium">Course:</span> {data.courseName}</h3>
                    <p className="pl-2 mb-4"><span className="font-medium">Payment type: </span> {paymentType}</p>
                    <p className="font-medium pl-2 mb-2">Payment details</p>
                    <p className="bg-blue-100 rounded-xl p-4 mb-10">
                        <div className="mb-2"> <span className="font-medium">Account name:</span> {data.accountName}</div>
                        <div className="mb-2">
                            <span className="font-medium">Account number: </span>
                            {data.accountNumber}
                            <button
                                ref={copyBtRef}
                                onClick={copyAccountNumber}
                                className="relative mx-2"
                            >
                                <FontAwesomeIcon icon={faCopy} className="w-5 h-5 text-blue-500" />
                                {copied && <span className="absolute top-2 left-2 bg-white text-xs py-1 px-2 rounded-full w-fit">account number copied</span>}
                            </button>

                        </div>
                        <div className="mb-2"><span className="font-medium">Amount:</span> ${data.amount}</div>
                        <div className="mb-2"><span className="font-medium">Bank name:</span> {data.bankName}</div>
                    </p>

                    <p className="bg-orange-100 rounded-xl p-4">
                        You will receive an email and a notification on this platform once your payment is recieved
                        <div className="text-sm mt-4"><FontAwesomeIcon icon={faExclamationTriangle} className="w-3 h-3 rounded-full text-white bg-red-600 p-2" /> This acount details is valid only one hour from now</div>
                    </p>
                </div >
            )
            )}
        </>
    )
}

export default AccountDetails;
'use client';

import { faCopy, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../multipurpose/loader";

interface dataType {
    courseName: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    amount: number;
}
const AccountDetails = () => {
    const searchParams = useSearchParams();
    const [showError, setShowError] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const [data, setData] = useState<dataType>({
        courseName: 'Financial literacy 101',
        accountName: 'Flutterwave',
        accountNumber: '293576757',
        bankName: 'Wema Bank',
        amount: 5000,
    });
    const courseId = searchParams.get('courseId');
    const paymentType = searchParams.get('type');

    const fetchPaymentInfo = () => {
        try {
            //if (paymentType != 'full' || paymentType != 'half' || !courseId) throw 'payment type not found';
            setTimeout(() => setShowLoader(false), 2000);
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
            ) : (<div className="mt-16 px-3">
                <h3 className="font-medium pl-2 mb-2">Course: {data.courseName}</h3>
                <p className="font-medium pl-2 mb-2">Payment type:{paymentType}</p>
                <p className="font-medium pl-2 mb-1">Payment details</p>
                <p className="bg-blue-100 rounded-xl p-4 mb-10">
                    <div className="mb-2"> <span className="font-medium">Account name:</span> {data.accountName}</div>
                    <div className="mb-2"><span className="font-medium">Account number:</span> {data.accountNumber} <FontAwesomeIcon icon={faCopy} className="w-5 h-5 text-blue-500" /></div>
                    <div className="mb-2"><span className="font-medium">Amount:</span> ${data.amount}</div>
                    <div className="mb-2"><span className="font-medium">Bank name:</span> {data.bankName}</div>
                </p>

                <p className="bg-orange-100 rounded-xl p-4">
                    You will receive an email and a notification on this platform once your payment is recieved
                    <div className="text-sm mt-4"><FontAwesomeIcon icon={faExclamation} className="w-3 h-3 rounded-full text-white bg-red-600 p-1" /> This acount details is valid only one hour from now</div>
                </p>
            </div >
            )}
        </>
    )
}

export default AccountDetails;
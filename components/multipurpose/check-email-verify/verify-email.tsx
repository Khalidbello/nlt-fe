'use client';

import { FormEvent, useEffect, useRef, useState } from "react";
import Loader from "../loader";
import RollerAnimation from "../roller-white";
import ChangeEmail from "../../settings/change-email";
import showClicked from "@/app/utils/clicked";
import { useRouter } from "next/navigation";

interface VerifyEmailProps {
    email: string;
    hide: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ email, hide }) => {
    const router = useRouter();
    const [otp, setOtp] = useState<string>('');
    const [otpRequested, setOtpRequested] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);
    const [successfull, setSuccessfull] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const generateOtpBtRef = useRef<null | HTMLButtonElement>(null);
    const changeEmailBtRef = useRef<null | HTMLButtonElement>(null);
    const [showChangeEmail, setShowChangeEmail] = useState<boolean>(false);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!otp) return setError('field can not be blank');

        try {
            setProcessing(true);

            const response = await fetch(`${apiHost}/users/confirm-email-otp`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    otp: otp,
                    email: email,
                })
            })

            if (response.status === 200) {
                const data = await response.json();

                if (data.status) {
                    setSuccessfull(true);
                    setTimeout(() => hide(false), 700)
                } else {
                    setError('wrong OTP entred');
                }
            } else if (response.status === 403) {
                router.push('/sign-in?redirect=true');
            } else {
                throw 'something went wrong';
            }
        } catch (err) {
            setError('something went wrong');
        } finally {
            setProcessing(false);
        }
    };


    // function t handle shoe change email
    const handeleShowChangeEmail = () => {
        if (changeEmailBtRef.current) showClicked(changeEmailBtRef.current);
        setTimeout(() => setShowChangeEmail(true), 210);
    }

    const requestOtpGeneration = async () => {
        console.log('in requesting opp.................')
        if (generateOtpBtRef.current) generateOtpBtRef.current.style.opacity = '0.5';
        try {
            setError('');
            setOtpRequested(false);

            const response = await fetch(`${apiHost}/users/send-email-confirm-otp`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });

            if (response.status === 403) return router.push('/sign-in?redirect=true');

            if (response.status !== 200) throw 'request otp faileed';
            setOtpRequested(true);

            setTimeout(() => {
                if (generateOtpBtRef.current) generateOtpBtRef.current.style.opacity = '1';
                setOtpRequested(false);
            }, 1000 * 30);
        } catch (err) {
            setError('otp requesting failed please try again');
            if (generateOtpBtRef.current) generateOtpBtRef.current.style.opacity = '1';
            setOtpRequested(false);
        };
    };

    useEffect(() => {
        // requestOtpGeneration();
    }, []);

    return (
        <div className="fixed top-0 left-0 p-3 w-full h-full flex items-center justify-center bg-blue-500 bg-opacity-90 z-50">
            <div className="bg-white rounded-xl p-6 mx-5">
                <h2 className="font-medium mb-2">Verify email</h2>
                <p className="mb-3">click on send OTP to send OTP to<span className="bg-violet-100 px-2 rounded-md">{email}</span></p>
                <button
                    onClick={handeleShowChangeEmail}
                    ref={changeEmailBtRef}
                    className="text-blue-400"
                >
                    change email ?</button>

                <div className="mt-3">
                    {otpRequested ? (
                        <span className="text-sm text-green-600">OTP requested kindly check your  email for otp</span>
                    ) : (
                        <button
                            onClick={requestOtpGeneration}
                            ref={generateOtpBtRef}
                            className="text-blue-500 block text-center"
                        >
                            click to send OTP
                        </button>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="block mt-4 px-4">
                    <input
                        className="boreder-gray-50 border-[1px] w-full p-3 rounded-full mt-2 mb-4"
                        placeholder="OTP"
                        onChange={(e) => { setOtp(e.target.value); setError('') }}
                        type="text" value={otp}
                    />
                    {error && <p className="text-red-500 text-xs my-2 text-center">{error}</p>}
                    {successfull && <p className="text-sm text-green-600 text-center">Email verified succesfully</p>}
                    <div className="text-right space-x-4">
                        <button
                            disabled={processing}
                            className="px-4 py-2 bg-blue-500 text-white rounded-full"
                        >
                            {processing ? <RollerAnimation h='h-[1rem]' /> : 'submit'}
                        </button>
                    </div>
                </form>
            </div>

            {/* to be deisplayd if user clicks change email */}
            {showChangeEmail && <ChangeEmail hide={setShowChangeEmail} hideVerifyEmail={hide} />}
        </div>
    )
}

export default VerifyEmail;
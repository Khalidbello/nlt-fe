import RollerAnimation from "@/components/multipurpose/roller-white";
import React, { useState } from "react";
import Link from 'next/link';
import Header from "@/components/multipurpose/header";

interface EnterOtpProps {
    email: string;
};

const EnterOtp: React.FC<EnterOtpProps> = ({ email }) => {
    const [otp, setOtp] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showRoller, setShowRoller] = useState<boolean>(false);
    const [showSucessfull, setShowSucessfull] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;



    // handle otp input change
    const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setOtp(parseInt(event.target.value));
        setError('');
    };

    const handleSubmitOtp = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!otp) return setError('field can not be blank');

        setShowRoller(true);

        try {
            setShowRoller(true);

            const response = await fetch(`${apiHost}/auth/password-recovery-otp`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    otp: otp.trim(),
                    email: email.trim()
                })
            });

            if (response.status === 401) return setError('The OTP you entred is invalid');

            if (response.status !== 200) throw 'something went wrong';
            const data = await response.json();

            setPassword(data.password);
            setTimeout(() => setShowSucessfull(true), 1000);
        } catch (err) {
            console.error('An error occured in sending emai recovery otp', err);
            setError('something went wrong try again');
        } finally {
            setShowRoller(false);
        };
    };

    if (showSucessfull) {
        return (
            <div className="w-full h-full bg-blue-600 bg-opacity-85 flex items-center justify-center">
                <div className="bg-white rounded-xl m-4 p-4">
                    <p>
                        Password recovery successfull. < br /> Your password is: <span className="font-medium">{password}</span>
                    </p>
                    <div className="mt-4">
                        <Link href='/sign-in' className="w-full mx-4 text-center px-4 py-2 rounded-full bg-blue-500 text-white">Sing in</Link>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-[80%] flex items-center justify-center">
            <Header heading="Password recovery" />
            <div className='h-[80%] flex justify-center items-center'>
                <form onSubmit={handleSubmitOtp} className='bg-white rounded-xl mt-16 p-6'>
                    <div className='mb-5'>
                        <label className='block mb-2 pl-4'>Enter OTP sent to: {email}</label>
                        <input
                            className='border-blue-100 border-[1px] text-gray-600 rounded-xl px-4 py-2 w-full'
                            type="number"
                            value={otp}
                            placeholder='OTP'
                            onChange={handleOtpChange}
                        />
                    </div>
                    {error && <p className='text-red-500 text-sm text-center mb-3'>{error}</p>}
                    <div className='text-right'>
                        <button
                            className='bg-blue-500 text-white px-5 py-2 rounded-full'
                            type="submit"
                            disabled={showRoller}
                        >
                            {showRoller ? (
                                <RollerAnimation h='h-[1.5rem]' />
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default EnterOtp; 
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import Roller from '@/components/multipurpose/roller-white';
import showClicked from '@/app/utils/clicked';

interface ChangeEmailProps {
    hide: React.Dispatch<React.SetStateAction<boolean>>;
    hideVerifyEmail: null | React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeEmail: React.FC<ChangeEmailProps> = ({ hide, hideVerifyEmail = null }) => {
    const [email, setEmail] = useState<string>('bello@gmail.com');
    const [otp, setOtp] = useState<number>();
    const [showRoller, setShowRoller] = useState<boolean>(false);
    const [enterEmail, setEnterEmail] = useState<boolean>(true);
    const [enterOTP, setEnterOTP] = useState<boolean>(false);
    const [showSucessfull, setSuccessfull] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const closeBtRef = useRef<null | HTMLButtonElement>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    // handle email inpu change
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setError('');
    };

    // hande email submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!email) return setError('Email can not be empty');

        setShowRoller(true);

        try {
            const response = await fetch(`${apiHost}/users/send-email-confirm-otp`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });
            //throw 'errorr'
            if (response.status !== 200) throw 'request otp faileed';

            setTimeout(() => {
                setEnterEmail(false);
                setEnterOTP(true);
            }, 500);
        } catch (err) {
            setError('Something went wrong submitting email. try again');
        } finally {
            setShowRoller(false);
        }
    };

    // handle otp input change
    const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(parseInt(event.target.value));
        setError('');
    };

    // function handle otp submission
    const handleSubmitOtp = async (event: React.FormEvent) => {
        event.preventDefault();

        setShowRoller(true);

        if (!otp) return setError('field can not be blank');

        try {
            setShowRoller(true);

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
            } else {
                throw 'something went wrong';
            }
        } catch (err) {
            setError('something went wrong');
        } finally {
            setShowRoller(false);
        }
        setTimeout(() => {
            setShowRoller(false);
            hide(false);
            if (hideVerifyEmail) hideVerifyEmail(false);
        }, 2000);
    };

    // function to close dialogue
    const close = () => {
        showClicked(closeBtRef);

        setTimeout(() => {
            hide(false);
        }, 250);
    }

    return (
        <div className='fixed top-0 left-0 bg-blue-500 bg-opacity-60 z-50 w-full h-full flex justify-center items-center'>
            <div className='relative mx-5 -mt-10'>
                <button
                    onClick={close}
                    ref={closeBtRef}
                    className='absolute top-2 right-2 flex items-center justify-center w-10 h-10 p-1 rounded-full bg-red-50'
                >
                    <FontAwesomeIcon icon={faX} className='text-red-500' />
                </button>

                {enterEmail && (
                    <form onSubmit={handleSubmit} className='bg-white rounded-xl mt-16 p-6'>
                        <h3 className='text-center mb-4 font-medium'>Change email</h3>
                        <div className='mb-5'>
                            <label className='block mb-2 pl-4'>Email:</label>
                            <input
                                className='border-blue-50 border-[1px] text-gray-600 rounded-xl px-4 py-2'
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
                        <div className='text-right'>
                            <button
                                className='bg-blue-500 text-white px-5 py-2 rounded-full'
                                type="submit"
                                disabled={showRoller}
                            >
                                {showRoller ? (
                                    <Roller h='h-[1.5rem]' />
                                ) : (
                                    'Save'
                                )}
                            </button>
                        </div>
                    </form>
                )}
                {enterOTP && (
                    <form onSubmit={handleSubmitOtp} className='bg-white rounded-xl mt-16 p-6'>
                        <h3 className='text-center mb-4 font-medium'>Change email</h3>
                        <div className='mb-5'>
                            <label className='block mb-2 pl-4'>Enter OTP sent to: {email}</label>
                            <input
                                className='border-blue-50 border-[1px] text-gray-600 rounded-xl px-4 py-2'
                                type="number"
                                value={otp}
                                onChange={handleOtpChange}
                            />
                        </div>
                        {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
                        {showSucessfull && <p>Email Change Succesfully</p>}
                <div className='text-right'>
                    <button
                        className='bg-blue-500 text-white px-5 py-2 rounded-full'
                        type="submit"
                        disabled={showRoller}
                    >
                        {showRoller ? (
                            <Roller h='h-[1.5rem]' />
                        ) : (
                            'Submit'
                        )}
                    </button>
                </div>
            </form>
                )}
        </div>
        </div >
    );
};

export default ChangeEmail;

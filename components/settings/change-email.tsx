import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import Roller from '@/components/multipurpose/roller-white';
import showClicked from '@/app/utils/clicked';

interface ChangeEmailProps {
    hide: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeEmail: React.FC<ChangeEmailProps> = ({ hide }) => {
    const [email, setEmail] = useState<string>('bello@gmail.com');
    const [otp, setOtp] = useState<number>();
    const [showRoller, setShowRoller] = useState<boolean>(false);
    const [enterEmail, setEnterEmail] = useState<boolean>(true);
    const [enterOTP, setEnterOTP] = useState<boolean>(false);
    const closeBtRef = useRef<null | HTMLButtonElement>(null)

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        //onSave(email);
        setShowRoller(true);

        setTimeout(() => {
            setShowRoller(false);
            setEnterEmail(false);
            setEnterOTP(true);
        }, 2000)
    };

    const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(parseInt(event.target.value));
    };

    const handleSubmitOtp = (event: React.FormEvent) => {
        event.preventDefault();
        //onSave(email);
        setShowRoller(true);

        setTimeout(() => {
            setShowRoller(false);
            hide(false);
        }, 2000);
    };

    const close = () => {
        showClicked(closeBtRef);
        setTimeout(() => hide(false), 250);
    }

    return (
        <div className='fixed top-0 left-0 bg-blue-500 bg-opacity-60 z-50 w-full h-full flex justify-center items-center'>
            <div className='relative mx-5'>
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
                        <div className='text-right'>
                            <button
                                className='bg-blue-500 text-white px-5 py-2 rounded-full'
                                type="submit">
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
                        <div className='text-right'>
                            <button
                                className='bg-blue-500 text-white px-5 py-2 rounded-full'
                                type="submit">
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
        </div>
    );
};

export default ChangeEmail;

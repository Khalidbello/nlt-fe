'use client';

import Link from 'next/link';
import React, { useState, useRef } from 'react';
import Loader from '@/components/multipurpose/roller-white';
import { validateEmail, validatePassword, verifyPhoneNumber } from './../validators';
import { useRouter } from 'next/navigation';

const SignUpForm: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    //const [adress, setAddress] = useState('');
    const [gender, setGender] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [succesfull, setSuccesfull] = useState<string>('');
    const [showBtLoader, setshowBtLoader] = useState<boolean>(false);
    const submitBt = useRef<HTMLButtonElement | null>(null);

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();

        // Perform form validation
        if (!validateEmail(email)) return setErrorMessage('Please enter a valid email.');
        if (!verifyPhoneNumber(phoneNumber)) return setErrorMessage('Please enter a valid phone number.');
        if (!gender) return setErrorMessage('Please select gender');
        if (!validatePassword(password)) return setErrorMessage('password should be atleast 8.');
        if (password !== confirmPassword) return setErrorMessage('Password confirmation not correct.')
        setErrorMessage('');

        // send login request
        if (submitBt.current) submitBt.current.disabled = true;

        setshowBtLoader(true)

        setTimeout(() => {
            setTimeout(() => {
                router.push('/home');
            }, 1000)
            setEmail('');
            setPassword('');
            setshowBtLoader(false);
            setSuccesfull('account succesfully created');

            // setTimeout(() => {
            //     setshowBtLoader(false);
            //     setErrorMessage('Invalid email or passowrd');
            //     if (submitBt.current) submitBt.current.disabled = false;
            // }, 2000);
        }, 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 py-6">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full mx-4">
                <div className="flex items-center justify-center mb-4">
                    <div className="bg-blue-600 w-20 h-20 rounded-full flex justify-center items-center">logo</div>
                </div>

                <h2 className="text-2xl mb-4 text-center font-bold">Sign Up</h2>

                <form onSubmit={handleSignUp}>
                    <div className="mb-10 mt-10">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { setErrorMessage(''); setEmail(e.target.value) }}
                            className="w-full border-gray-300 border-[1px] rounded-md py-2 px-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-10">
                        <input
                            type="text"
                            placeholder="Phone number"
                            value={phoneNumber}
                            onChange={(e) => { setErrorMessage(''); setPhoneNumber(e.target.value) }}
                            className="w-full border-gray-300 border-[1px] rounded-md py-2 px-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    {/* <div className="mb-10">
                        <input
                            type="text"
                            placeholder="Address"
                            value={adress}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border-gray-300 border-[1px] rounded-md py-2 px-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500"
                        />
                    </div> */}
                    <div className="mb-10">
                        <select
                            value={gender}
                            onChange={(e) => { setErrorMessage(''); setGender(e.target.value) }}
                            className="w-full border-gray-300 border-[1px] rounded-md py-2 px-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setErrorMessage(''); setPassword(e.target.value) }}
                            className="w-full border-gray-300 border-[1px] rounded-md py-2 px-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-10">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => { setErrorMessage(''); setConfirmPassword(e.target.value) }}
                            className="w-full border-gray-300 border-[1px] rounded-md py-2 px-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {succesfull && <div className='text-green-500 text-center texx-sm'>{succesfull}</div>}
                    {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

                    <div className="mb-10 mt-16">
                        <button
                            ref={submitBt}
                            type="submit"
                            className="w-full bg-blue-600 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            {showBtLoader ? (<Loader h='h-[2rem]' />) : 'Sign Up'}
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-600">
                    Already have an account? <Link href="sign-in" className="text-blue-600">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpForm;

'use client';

import Link from 'next/link';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/multipurpose/roller-white';
import { validateEmail, validatePassword } from './../validators';

const LoginForm: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loggedIn, setLoggedIn] = useState<string>('')
    const [showBtLoader, setshowBtLoader] = useState<boolean>(false);
    const submitBt = useRef<HTMLButtonElement | null>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Perform form validation
        if (!validateEmail(email)) return setErrorMessage('Please enter a valid email.');
        if (!validatePassword(password)) return setErrorMessage('password should be atleast 8.');
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
            setLoggedIn('succesfully loggedin');

            // setTimeout(() => {
            //     setshowBtLoader(false);
            //     setErrorMessage('Invalid email or passowrd');
            //     if (submitBt.current) submitBt.current.disabled = false;
            // }, 2000);
        }, 2000);
    };

    return (
        <div className="py-4 min-h-screen flex items-center justify-center bg-blue-50">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full mx-4">
                <div className="flex items-center justify-center mb-4">
                    <div className="bg-blue-600 w-20 h-20 rounded-full flex justify-center items-center">logo</div>
                </div>

                <h2 className="text-2xl mb-12 text-center font-bold">Welcome Back to brandName</h2>

                <form onSubmit={handleLogin}>
                    <div className="mb-10">
                        <input
                            type="email"
                            formNoValidate={true}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { setErrorMessage(''); setEmail(e.target.value) }}
                            className="w-full border-gray-300 border-[1px] rounded-md py-2 px-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-10">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setErrorMessage(''); setPassword(e.target.value) }}
                            className="w-full border-gray-300 border-[1px] rounded-md py-2 px-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {loggedIn && <div className='text-green-600 text-sm text-center'>{loggedIn}</div>}
                    {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

                    <div className="mb-4 mt-14">
                        <button
                            ref={submitBt}
                            type="submit"
                            className="w-full bg-blue-600 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            {showBtLoader ? <Loader h='h-[2rem]' /> : 'Sign In'}
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-600 mt-6">
                    {`Don't have an account ? `}
                    <Link href="/sign-up" className="text-blue-500">Sign Up</Link>
                </p>
                <p className="text-center text-gray-600 mt-3">
                    <Link href="/forgot-password" className="text-blue-600">Forgot Password ?</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
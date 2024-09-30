'use client';

import Link from 'next/link';
import React, { useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from '@/components/multipurpose/roller-white';
import { validateEmail, validatePassword } from './../validators';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

const LoginForm: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loggedIn, setLoggedIn] = useState<string>('')
    const [showBtLoader, setshowBtLoader] = useState<boolean>(false);
    const submitBt = useRef<HTMLButtonElement | null>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const redirect = searchParams.get('redirect');
    const passwordVisibilityRef = useRef<HTMLButtonElement | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(true);

    // function to handle password visibility 
    const handlePasswordVisiblity = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleLogin = async () => {
        // Perform form validation
        if (!validateEmail(email)) return setErrorMessage('Please enter a valid email.');
        if (!validatePassword(password)) return setErrorMessage('password should be atleast 8.');
        setErrorMessage('');

        try {
            // send login request
            if (submitBt.current) submitBt.current.disabled = true;
            setshowBtLoader(true);

            const response = await fetch(`${apiHost}/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password.trim()
                })
            });

            if (response.status === 200) {
                setEmail('');
                setPassword('');
                setshowBtLoader(false);
                setLoggedIn('succesfully logged in');

                if (redirect === 'true') {
                    router.back()
                } else {
                    setTimeout(() => router.push('/home'), 500);
                };
            } else if (response.status === 404) {
                setErrorMessage('Incorrect email or password.');
            } else {
                throw 'somehing went wrong';
            }
        } catch (err) {
            console.log('error in signing in ', err);
            setErrorMessage('Something went wrong please try again.');
        } finally {
            if (submitBt.current) submitBt.current.disabled = false;
            setshowBtLoader(false)
        };
    };

    return (
        <div className="py-4 min-h-screen flex items-center justify-center bg-blue-50">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full mx-4">
                <div className="flex items-center justify-center mb-4">
                    <Image src='/images/logo.jpg' alt='Brand logo' width={200} height={200} />
                </div>

                <h2 className="text-xl mb-12 text-center font-bold">Welcome Back </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-10">
                        <input
                            type="email"
                            formNoValidate={true}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { setErrorMessage(''); setEmail(e.target.value) }}
                            className="w-full border-gray-300 border-[1px] rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center justify-between mb-6 w-full border-gray-300 border-[1px] rounded-md">
                        <input
                            type={showPassword ? 'password' : 'text'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setErrorMessage(''); setPassword(e.target.value) }}
                            className="w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 border-[1px] rounded-md py-2 px-3"
                        />
                        <button ref={passwordVisibilityRef} onClick={(e) => { e.stopPropagation(); handlePasswordVisiblity(); }} className='w-10 h-full'>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="w-4 h-5" />
                        </button>
                    </div>

                    {loggedIn && <div className='text-green-500 text-sm text-center'>{loggedIn}</div>}
                    {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

                    <div className="mb-4 mt-10">
                        <button
                            onClick={handleLogin}
                            ref={submitBt}
                            type="submit"
                            className="w-full bg-blue-500 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            {showBtLoader ? <Loader h='h-[2rem]' /> : 'Sign In'}
                        </button>
                    </div>
                </form>

                <p className="text-center text-gray-500 mt-6">
                    {`Don't have an account ? `}
                    <Link href="/sign-up" className="text-blue-500">Sign Up</Link>
                </p>
                <p className="text-center text-gray-500 mt-3">
                    <Link href="/forgot-password" className="text-blue-500">Forgot Password ?</Link>
                </p>
            </div >
        </div >
    );
};


const Page: React.FC = () => {
    return (
        <Suspense fallback={<Loader h={'h-[5rem]'} />}>
            <LoginForm />
        </Suspense>
    );
};

export default Page;
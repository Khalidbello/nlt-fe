'use client';

import Link from 'next/link';
import React, { useState, useRef } from 'react';
import Loader from '@/components/multipurpose/roller-white';
import { validateEmail, validatePassword, verifyPhoneNumber } from './../validators';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignUpForm: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [succesfull, setSuccesfull] = useState<string>('');
    const [showBtLoader, setshowBtLoader] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const submitBt = useRef<HTMLButtonElement | null>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;


    const handlePasswordVisiblity = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmPasswordVisiblity = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleSignUp = async () => {
        // Perform form validation
        if (!firstName) return setErrorMessage('Please enter you first name');
        if (!lastName) return setErrorMessage('Please enter you last name');
        if (!validateEmail(email)) return setErrorMessage('Please enter a valid email.');
        if (!verifyPhoneNumber(phoneNumber)) return setErrorMessage('Please enter a valid phone number.');
        if (!gender) return setErrorMessage('Please select gender');
        if (!validatePassword(password)) return setErrorMessage('password should be atleast 8.');
        if (password !== confirmPassword) return setErrorMessage('Password confirmation not correct.')
        setErrorMessage('');

        try {
            if (submitBt.current) submitBt.current.disabled = true;
            setshowBtLoader(true);

            const response = await fetch(`${apiHost}/auth/create-account`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    phoneNumber: phoneNumber.trim(),
                    gender: gender,
                    password: password.trim()
                })
            });

            if (response.status === 200) {
                setEmail('');
                setPassword('');
                setshowBtLoader(false);
                setSuccesfull('account succesfully created');
                setTimeout(() => router.push('/home'), 1000);
            } else if (response.status === 409) {
                setErrorMessage('User with email alredy exist login instead.')
            } else {
                throw 'somehing went wrong please try again';
            };
        } catch (err) {
            console.log('error in signing in ', err);
            setErrorMessage('Something went wrong please try again.');
        } finally {
            if (submitBt.current) submitBt.current.disabled = false;
            setshowBtLoader(false);
        };
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 py-6">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full mx-4">
                <div className="flex items-center justify-center mb-4">
                    <div className="bg-blue-600 w-20 h-20 rounded-full flex justify-center items-center">logo</div>
                </div>

                <h2 className="text-2xl mb-4 text-center font-bold">Sign Up</h2>

                <form onSubmit={onSubmit}>
                    <div className="mb-10 mt-10">
                        <input
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => { setErrorMessage(''); setFirstName(e.target.value) }}
                            className="w-full border-gray-300 border-[1px] rounded-md py-2 px-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-10 mt-10">
                        <input
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => { setErrorMessage(''); setLastName(e.target.value) }}
                            className="w-full border-gray-300 border-[1px] rounded-md py-2 px-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
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
                    <div className="flex items-center justify-between mb-6 w-full border-gray-300 border-[1px] rounded-md">
                        <input
                            type={showPassword ? 'password' : 'text'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setErrorMessage(''); setPassword(e.target.value) }}
                            className="w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 border-[1px] rounded-md py-2 px-3"
                        />
                        <button onClick={handlePasswordVisiblity} className='w-10 h-full'>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="w-4 h-5" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between mb-6 w-full border-gray-300 border-[1px] rounded-md">
                        <input
                            type={showConfirmPassword ? 'password' : 'text'}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => { setErrorMessage(''); setConfirmPassword(e.target.value) }}
                            className="w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 border-[1px] rounded-md py-2 px-3"
                        />
                        <button onClick={handleConfirmPasswordVisiblity} className='w-10 h-full'>
                            <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} className="w-4 h-5" />
                        </button>
                    </div>

                    {succesfull && <div className='text-green-500 text-center texx-sm'>{succesfull}</div>}
                    {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

                    <div className="mb-10 mt-16">
                        <button
                            onClick={handleSignUp}
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

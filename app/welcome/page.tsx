'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const Welcome: React.FC = () => {
    const router = useRouter();

    const handleCheckEyes = () => {
        router.push('/scanner');
        alert('Redirecting to scanner page');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-white p-5">
            <div className="flex items-center justify-center mb-4">
                <Image src='/images/logo.jpg' alt='Brand logo' width={200} height={200} />
            </div>
            <h1 className="text-4xl font-bold mb-12 text-gray-800">Learnig made easy</h1>
            <div className="w-64 h-64  rounded-xl flex flex-col items-center justify-center gap-4 bg-white">
                <Link
                    className="px-6 py-2 bg-blue-500 text-white text-lg font-medium rounded-full hover:bg-blue-600 transition-colors"
                    href={'/sign-in'}
                >
                    Log In
                </Link>
                <div className='rounded-full w-10 h-10 bg-blue-200 text-blue-600 flex items-center justify-center'>OR</div>
                <Link
                    className="px-6 py-2 bg-blue-500 text-white text-lg font-medium rounded-full hover:bg-blue-600 transition-colors"
                    href={'/sign-up'}
                >
                    Create Account
                </Link>
            </div>
        </div>
    );
};

export default Welcome;
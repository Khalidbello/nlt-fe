// app/not-found.js
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {/* Fancy 404 Heading */}
            <h1 className="text-7xl font-bold text-blue-600 mb-4 animate-pulse">404</h1>
            <h2 className="text-3xl font-semibold text-gray-700">Oops! Page Not Found</h2>

            {/* Description */}
            <p className="mt-2 text-lg text-gray-500">
                {`Sorry, the page you are looking for doesn't exist or has been moved.`}
            </p>

            {/* Go Home Button */}
            <a
                href="/home"
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
                Go Home
            </a>

            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="mt-4 px-6 py-2 border border-blue-600 text-blue-600 rounded-lg shadow hover:bg-blue-600 hover:text-white transition-colors"
            >
                Go Back
            </button>

            {/* Decorative Graphic */}
            <div className="mt-8 w-full max-w-md">
                <Image
                    src="/images/404.png"
                    alt="404 Graphic"
                    width={400}
                    height={400}
                    className="w-full rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
}

'use client';

import React, { useState } from 'react';

export default function Hero() {
    const [inView, setInView] = useState(false);
    const [inView2, setView2] = useState(false);


    return (
        <div className="bg-blue-700 pt-10 max-w-srcree-2xl h-auto flex flex-col justify-around items-center  gap-x-10 gap-y-14 px-10  md:h-full  md:flex-row md:px-20">
            <div className="flex flex-col items-start gap-y-6 text-center  md:mr-8 md:text-left">
                <p className="pt-28 text-2xl md:text-4xl font-bold md:font-extrabold text-white flex flex-col gap-y-12 items-start">
                    <span>{`Unlock Your Potential with Life Style Leverage`}<span className="text-blue-500">... </span></span>
                </p>
                <p className="text-white flex-grow-1 text-center md:text-left">
                    Discover essential skills in money management, interpersonal relationships, and time optimization effortlessly with <span className='text-blue-200'>Life Syle Leverage</span>.
                    Explore curated courses designed to empower you with practical knowledge and real-world insights. Start your journey today and unlock your path to success.
                </p>
                <div className='w-full text-center md:text-left'>
                    <button className="block-inline mt-4 md:mt-8 px-8 py-4 rounded-full bg-white text-blue-700 font-semibold">
                        Start Learning
                    </button>
                </div>
            </div>
            <div className="flex-grow-1 bg-blue-600 rounded-2xl h-96 w-full mb-10 md:mb-0 md:h-[80%] md:min-w-[50%] min-w-[80%]">
            </div>
        </div >
    )
}
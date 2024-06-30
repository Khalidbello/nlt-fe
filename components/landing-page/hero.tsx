'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {

    return (
        <div className="bg-blue-700 pt-10 max-w-srcree-2xl h-auto flex flex-col justify-around items-center  gap-x-10 gap-y-14 px-10  md:h-full  md:flex-row md:px-20">
            <div className="flex flex-col items-start gap-y-6 text-center  md:mr-8 md:text-left">
                <p className="pt-16 md:pt-28 text-2xl md:text-4xl font-bold md:font-extrabold text-white flex flex-col gap-y-12 items-start">
                    <span>{`Unlock Your Potential with Life Style Leverage`}<span className="text-blue-500">... </span></span>
                </p>
                <p className="text-white mb-4 md:mb-8 flex-grow-1 text-center md:text-left">
                    Feeling overwhelmed by the desire to improve your life but lacking the time or direction? Lifestyle Leverage is your all-in-one e-learning app, offering curated courses
                    on productivity, wellness, personal finance, and more. Fit bite-sized lessons seamlessly into your day and leverage your lifestyle to reach your full potential.
                </p>
                <div className='w-full text-center md:text-left'>
                    <Link href='/sign-in' className="block-inline px-8 py-4 rounded-full bg-white text-blue-700 font-semibold">
                        Start Learning
                    </Link>
                </div>
            </div>
            <div className="flex-grow-1 bg-blue-600 rounded-2xl h-96 w-full mb-10 md:mb-0 md:h-[80%] md:min-w-[50%] min-w-[80%]">
                <Image alt='hero' src='/images/hero.gif' height={1000} width={1000} className='w-full h-full' />
            </div>
        </div >
    )
}
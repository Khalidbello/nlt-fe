'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {

    return (
        <div className="relative bg-blue-700 pt-10 max-w-srcree-2xl h-auto flex flex-col justify-around items-center  gap-x-10 gap-y-14 px-10  md:h-full  md:flex-row md:px-20">
            <div className='w-[20rem] h-[20rem] md:h-[35rem] md:w-[35rem] rounded-full absolute -top-[4rem] -left-[3rem] md:-top-[10rem] md:-left-[6rem] bg-blue-800 z-20 bg-opacity-70 z-1'></div>
            <div className="relative z-30 flex flex-col items-start gap-y-6 text-center  md:mr-8 md:text-left">
                <p className="pt-16 md:pt-28 text-2xl md:text-4xl font-bold md:font-extrabold text-white flex flex-col gap-y-12 items-start">
                    <span>{`Discover The Solution You Seek For a Better Life`}<span className="text-blue-500">... </span></span>
                </p>
                <p className="text-white mb-4 md:mb-8 flex-grow-1 text-center md:text-left">
                    Feeling overwhelmed by the desire to improve your life but lacking the time or direction? LifetyleLeverage is your all-in-one e-learning app, offering curated courses
                    on productivity, wellness, personal finance, and more. Fit bite-sized lessons seamlessly into your day and leverage your lifestyle to reach your full potential.
                </p>
                <div className='w-full text-center md:text-left'>
                    <Link href='/welcome' className="block-inline px-8 py-4 rounded-full bg-white text-blue-700 font-semibold">
                        Start Learning
                    </Link>
                </div>
            </div>
            <div className="relative z-30 flex-grow-1 bg-blue-600 rounded-2xl h-96 w-full mb-10 md:mb-0 md:h-[80%] md:min-w-[50%] min-w-[80%]">
                <Image alt='hero' src='/images/hero.gif' height={1000} width={1000} className='w-full h-full' unoptimized />
            </div>
        </div >
    )
}
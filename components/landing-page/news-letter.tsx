'use client';

import Image from 'next/image';
import { useState } from 'react';
import RollerAnimation from '../multipurpose/roller-white';

const NewsLetter: React.FC = () => {
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const subscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        setSuccess(false);
        setError('');
        setSubmitting(true);

        try {
            const response = await fetch(`${apiHost}/users/news-letter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (response.status !== 200) throw 'Something went wrong';
            setSuccess(true);
        } catch (err) {
            console.error('error in news letter', err);
            setError('An error occured subcribing. please try again.');
        } finally {
            setSubmitting(false);
        };
    };

    return (
        <div id='news-letter' className="relative rounded-xl px-5 mb-20 max-w-screen-xl mx-auto flex justify-between items-center flex-wrap-reverse gap-x-20 gap-y-10 md:px-20 md:flex-nowrap">
            {/* <div className="w-[350px] h-[400px] bg-yellow-400 transform rotate-[45deg] absolute top-[-60px] right-[-190px]"></div> */}
            <div className={`mt-36 mr-12 ml-5 transition-opacity duration-[1500ms]  relative flex-shrink w-[98%] md:min-w-[50%] h-72 md:h-[30em] bg-blue-700 rounded-2xl`}>
                <div className='absolute -top-7 -right-7 w-full h-full rounded-2xl bg-cyan-300'>
                    <Image alt='easy ui image' src={'/images/newsletter.gif'} className='absolute  -top-[8rem] md:-top-[10rem] left-0 w-full h-[140%]' width={1000} height={1000} />
                </div>
            </div>

            <div className="relative flex-shrink px-4 mt-8">
                <h3 className="font-medium flex flex-col">
                    <span className='text-blue-600 text-sm font-medium'>News Letter</span>
                    <span>Suscribe To Our News Letter, Be The First To Know About An Update</span>
                </h3>

                <form className="text-gray-600 pt-5" onSubmit={subscribe}>
                    <div className='flex justify-evenly items-stretch'>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder='Email'
                            className='rounded-l-xl bg-gray-100 w-[70%] px-4 py-3'
                        />
                        <button disabled={submitting} className='bg-blue-600 text-white rounded-r-xl px-3 max-w-[6rem]'>
                            {submitting ? (
                                <RollerAnimation h='h-[1.5rem]' />
                            ) : (
                                'Subscribe'
                            )}
                        </button>
                    </div>
                </form>
                {success && <p className='mt-3 text-sm text-green-500'>Subscription successfull</p>}
                {error && <p className='mt-3 text-sm text-red-500'>{error}</p>}
            </div>
        </div>
    );
};



export default NewsLetter;
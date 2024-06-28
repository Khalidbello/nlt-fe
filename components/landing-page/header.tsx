'use client';

// header for landing page
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBars } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
//import MobileNav from '@/components/landing-page/mobile-nav';
import { useRef, useState } from 'react';
import showClick from '@/app/utils/clicked';


const Header: React.FC = () => {
    const [flag, setFlag] = useState<boolean>(false);
    const menuBtRef = useRef<null | HTMLButtonElement>(null);

    const handleMenuClick = () => {
        if (menuBtRef.current) showClick(menuBtRef.current);
        setTimeout(() => setFlag(true), 210);
    };

    return (
        <>
            <header className='z-50 fixed w-full p-3 pt-0 flex items-center justify-center'>
                <div className='max-w-screen-xl bg-blue-100 w-full rounded-xl px-5 py-2 flex justify-between items-center h-16'>
                    <span className='inline-flex items-center gap-2 max-w-lg'>
                        <FontAwesomeIcon icon={faStar} className='text-blue-500 text-x h-10' />
                        <span className='font-bold'>Life<span className='text-blue-500'>Style</span>Leverage</span>
                    </span>

                    <span className='hidden items-center justify-between gap-5 xl:gap-x-32 lg:inline-flex'>
                        <nav>
                            <Link href='#' className='hover:bg-blue-500 hover:text-white px-3 py-2 mx-1 rounded-xl text-blue-700 bg-blue-200'> Trusted By </Link>
                        </nav>
                        <span className='inline-flex gap-4'>
                            <Link href='/sign-in' className='hover:bg-blue-500 hover:text-white px-4 py-2 border border-solid border-blue-600 text-blue-600 rounded-full'> Sign In</Link>
                            <Link href='/sign-up' className='px-4 py-2 bg-blue-600 text-white rounded-full hover:opacity-40'> Sign Up</Link>
                        </span>
                    </span>

                    <button ref={menuBtRef} onClick={handleMenuClick} className=' lg:hidden'>
                        <FontAwesomeIcon
                            icon={faBars}
                            className='h-4 w-4 p-2 rounded-full bg-blue-600 text-white'
                        />
                    </button>
                </div>
            </header>
            {/* {flag && <MobileNav flag={flag} setFlag={setFlag} />} */}
        </>

    )
};


export default Header;
'use client';

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Link as ScrollLink, Element, Events, scrollSpy } from 'react-scroll';
import showClicked from '@/app/utils/clicked';

interface MobileNavProps {
    flag: boolean;
    setFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileNav: React.FC<MobileNavProps> = ({ flag, setFlag }) => {
    const [show, setShow] = useState<boolean>(false);
    const container = useRef<HTMLDivElement | null>(null);
    const xBtRef = useRef<null | HTMLButtonElement>(null);

    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        Events.scrollEvent.register('begin', function (to, element) {
            console.log('begin', arguments);
        });

        Events.scrollEvent.register('end', function (to, element) {
            setActiveSection(to);
        });

        // Register scroll spy
        scrollSpy.update();

        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        };
    }, []);

    useEffect(() => {
        console.log('in us effect mobile nav')
        toggler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flag])

    const toggler = () => {
        if (show) {
            if (xBtRef.current) showClicked(xBtRef.current);
            setTimeout(() => {
                setShow(false);
                setTimeout(() => {
                    if (container.current) container.current.style.display = 'none';
                    setFlag(false);
                }, 1050);
            }, 210);
        } else {
            if (container.current) container.current.style.display = 'block';
            setTimeout(() => {
                setShow(true);
            }, 50);
        };
    };

    return (
        <div ref={container} className="z-50 xl:hidden hidden fixed top-0 bottom-0 w-full h-full bg-blue-100">

            <div className={`absolute top-5 right-7 max-h-[90%] overflow-y-auto transition-transform duration-[1s] ${show ? 'translate-y-0' : 'translate-y-[-1000px]'}`}>
                <div className="text-right mb-2">
                    <button ref={xBtRef} onClick={toggler} className="inline-flex items-center justify-center w-8 h-8 rounded-full text-2xl font-semibold text-white bg-blue-600">
                        <FontAwesomeIcon icon={faX} className="w-4 h-4 text-white" />
                    </button>
                </div>

                <nav className="flex flex-col gap-y-4 py-6 px-5 text-center rounded-xl  border-[2px] border-blue-300 w-[14rem]">
                    <ScrollLink
                        onClick={toggler}
                        to="features"
                        smooth={true}
                        duration={500}
                        offset={-100}
                        spy={true}
                        onSetActive={() => setActiveSection('features')}
                        className={`${activeSection === 'features' ? 'bg-blue-700 text-white' : ' text-blue-700'} hover:bg-blue-500 hover:text-white px-3 py-2 mx-1 rounded-xl bg-blue-200`}
                    >
                        Features
                    </ScrollLink>
                    <ScrollLink
                        onClick={toggler}
                        to="review"
                        smooth={true}
                        duration={500}
                        offset={-100}
                        spy={true}
                        onSetActive={() => setActiveSection('review')}
                        className={`${activeSection === 'review' ? 'bg-blue-700 text-white' : ' text-blue-700'} hover:bg-blue-500 hover:text-white px-3 py-2 mx-1 rounded-xl bg-blue-200`}
                    >
                        Review
                    </ScrollLink>
                    <ScrollLink
                        onClick={toggler}
                        to="news-letter"
                        smooth={true}
                        duration={500}
                        offset={-100}
                        spy={true}
                        onSetActive={() => setActiveSection('news-letter')}
                        className={`${activeSection === 'news-letter' ? 'bg-blue-700 text-white' : ' text-blue-700'} hover:bg-blue-500 hover:text-white px-3 py-2 mx-1 rounded-xl bg-blue-200`}
                    >
                        News Letter
                    </ScrollLink>
                    <div className="flex flex-col gap-y-4 mt-6">
                        <Link href='/sign-in' className='hover:bg-blue-500 hover:text-white px-4 py-2 border border-solid border-blue-600 text-blue-600 rounded-full'> Sign In</Link>
                        <Link href='/sign-up' className='px-4 py-2 bg-blue-600 text-white rounded-full hover:opacity-40'> Sign Up</Link>
                    </div>
                </nav>
            </div>
        </div>

    )
};

export default MobileNav;
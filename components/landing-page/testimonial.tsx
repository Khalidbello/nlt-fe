'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

export default function StudentsReview() {
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const [current, setCurrent] = useState(0);

    const scrollTo = (index: number) => {
        setCurrent(index);
        if (carouselRef.current) {
            carouselRef.current.scrollTo({
                left: index * 300,
                behavior: 'smooth'
            });
        }
    };

    const leftScroll = () => {
        const nextIndex = current - 1;
        if (nextIndex >= 0) {
            scrollTo(nextIndex);
        }
    };

    const rightScroll = () => {
        const nextIndex = current + 1;
        if (nextIndex < members.length) {
            scrollTo(nextIndex);
        };
    };

    return (
        <div id='review' className="bg-white px-4 md:px-10 py-20 md:p-10 relative">
            <h2 className="flex flex-col items-center justify-center gap-2 text-center mb-3">
                <span className="text-sm text-blue-700 font-medium">Our Students</span>
                <span className="text-gray-800 text-lg text-center">What They Think About Us</span>
            </h2>
            <div className="md:max-w-[1100px] relative mx-auto">
                <div
                    ref={carouselRef}
                    className="md:max-w-[1000px] mx-auto flex justify-start items-stretch gap-[20px] mt-10  relative overflow-hidden"
                >
                    {members.map((_, index) => (
                        <Member key={index} />
                    ))}
                </div>
                <button className="left-bt absolute top-[50%] left-[-10px] md:left-0 z-10 bg-blue-800 bg-opacity-50 p-2 w-14 h-14 rounded-full flex justify-center items-center" onClick={leftScroll}>
                    <FontAwesomeIcon icon={faLessThan} className="h-4 w-4 text-blue-600" />
                </button>
                <button className="right-bt absolute top-[50%] right-[-10px] md:right-0 z-10 bg-blue-800 bg-opacity-50 p-2 w-14 h-14 rounded-full flex justify-center items-center" onClick={rightScroll}>
                    <FontAwesomeIcon icon={faGreaterThan} className="h-4 w-4 text-blue-600" />
                </button>
            </div>

            <div className="indcator flex justify-center items-center gap-1 mt-4">
                {members.map((_, index) => (
                    <button
                        key={index}
                        className={`hover:bg-orange-300 w-2 h-2 rounded-full ${index === current ? 'bg-blue-700' : 'bg-blue-100'}`}
                        onClick={() => scrollTo(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};


const Member: React.FC = () => {
    return (
        <div className="flex-shrink-0 w-[250px] h-[25rem] bg-orange-400 rounded-lg ml-[20px] overflow-hidden relative shadow-lg">
            <div className="flex flex-col justify-between items-center w-full h-full text-white">
                <div className="text-sm text-center px-4 pt-10">
                    <p className="leading-10">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                    </p>
                </div>

                <div className="flex items-center mb-6 justify-start">
                    <div className="rounded-full bg-white w-16 h-16 flex items-center justify-center mr-6">
                        <div className='w-6 h-6 rounded-full'>
                            {/* <img src="user_profile_picture.jpg" alt="User Profile" className="w-12 h-12 rounded-full" /> */}
                        </div>
                    </div>
                    <div>
                        <div className="text-xl font-semibold mb-1">John Doe</div>
                        <div className="text-sm">Student</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const members: any[] = [1, 2, 3, 5, 6, 7, 8, 9, 10];

'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import LoadingAnimation from "../../multipurpose/loader";
import Review from "./unit-testimonial";

export default function StudentsReview() {
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const [current, setCurrent] = useState(0);
    const [fetching, setFetching] = useState<boolean>(true);
    const [fetchingMore, setFetchingMore] = useState<boolean>(true);
    const [reviews, setReviews] = useState<any>([]);
    const [pagin, setPagin] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    // function to fetch reviews
    const fetchReviews = async () => {
        try {
            setFetchingMore(true);

            const response = await fetch(`${apiHost}/users/reviews/${pagin}/10`)

            const datas = await response.json();
            setReviews([...reviews, ...datas]);
            console.log('reviewessssssssssssssssss', datas);
        } catch (err) {
            console.error('An error  occured in fetch reviews');
            setError('An error occured please try again.');
        } finally {
            setFetching(false);
            setFetchingMore(false);
        };
    };

    const fetchMoreReiews = async () => {
        setPagin(pagin + 10);
    };

    const scrollTo = (index: number) => {
        setCurrent(index);
        alert('indexxx' + index);
        if (carouselRef.current) {
            carouselRef.current.scrollTo({
                left: index * 290,
                behavior: 'smooth'
            });
        };
    };

    const leftScroll = () => {
        const nextIndex = current - 1;
        if (nextIndex >= 0) {
            scrollTo(nextIndex);
        } else {
            scrollTo(current);
        };
    };

    const rightScroll = () => {
        const nextIndex = current + 1;
        if (nextIndex < reviews.length) {
            scrollTo(nextIndex);
        } else {
            scrollTo(current);
        };
    };

    useEffect(() => {
        fetchReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagin])

    if (fetching) {
        return (
            <div id='review' className="bg-gray-200 px-4 md:px-10 py-20 md:p-10 relative">
                <h2 className="flex flex-col items-center justify-center gap-2 text-center mb-3">
                    <span className="text-sm text-blue-700 font-medium">Our Students</span>
                    <span className="text-gray-800 text-lg text-center">What They Think About Us</span>
                </h2>
                <LoadingAnimation h="h-[2rem]" />
            </div>
        )
    }
    return (
        <div id='review' className="bg-gray-200 px-4 md:px-10 py-20 md:p-10 relative mb-8">
            <h2 className="flex flex-col items-center justify-center gap-2 text-center mb-3">
                <span className="text-sm text-blue-700 font-medium">Our Students</span>
                <span className="text-gray-800 text-lg text-center">What They Say About Our Courses</span>
            </h2>
            <div className="md:max-w-[1100px] relative mx-auto">
                <div
                    ref={carouselRef}
                    className="md:max-w-[1000px] mx-auto flex justify-start items-stretch gap-[20px] mt-10  relative overflow-hidden"
                >
                    {reviews.map((review: any, index: any) => (
                        <Review review={review} key={index} />
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
                {reviews.map((_: any, index: any) => (
                    <button
                        key={index}
                        className={`hover:bg-orange-100 w-2 h-2 rounded-full ${index === current ? 'bg-orange-300' : 'bg-gray-100'}`}
                        onClick={() => scrollTo(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};
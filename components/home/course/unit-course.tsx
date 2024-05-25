'use client';

import { faChartPie, faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import { faSchool } from '@fortawesome/free-solid-svg-icons/faSchool';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import showClicked from '@/app/utils/clicked';
import Image from 'next/image';

interface courseCardProps {
    courseId: number;
    courseName: string;
    title: string;
    description: string;
    imageUrl: string;
    enrolledStudents: number;
    numChapters: number;
    numLessons: number;
    isEnrolled: boolean;
    progress: number;
    lastVisited: string;
}


function CourseCard({ courseId, courseName, title, description, imageUrl, enrolledStudents, numChapters, numLessons, isEnrolled, progress, lastVisited }: courseCardProps) {
    const actionBtRef = useRef<null | HTMLButtonElement>(null);
    const router = useRouter();

    const handleClick = () => {
        showClicked(actionBtRef);
        setTimeout(() => router.push(`/course-view?course_id=${courseId}`), 250);
    };

    return (
        <div className="bg-blue-50 mb-4 mx-3 pt-2 px-2 rounded-lg shadow-md overflow-hidden">
            <div className='w-full h-[15rem] rounded-lg bg-blue-500'>
                <Image alt='course image' src={imageUrl} height={400} width={300} className='w-full h-full rounded-lg' />
            </div>

            <div className="p-6 flex flex-col gap-4">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800">{courseName}</h3>
                    <p className="text-gray-600 line-clamp-3">{isEnrolled ? title : description}</p>
                </div>
                {isEnrolled ? (
                    <>
                        <div className="flex items-center text-gray-500 text-sm">
                            <FontAwesomeIcon icon={faChartPie} className='w-5 h-5 text-blue-400' />
                            <p className='ml-3'>Progress: {progress}%</p>
                        </div>
                        <div className="w-full h-2 rounded-full bg-gray-200">
                            <div
                                className="h-full rounded-full bg-blue-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                            <FontAwesomeIcon icon={faClock} className='w-5 h-5 text-blue-400' />
                            <p className='ml-3'>Last Visited: {lastVisited.split('T')[0]}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center text-gray-500 text-sm">
                            <FontAwesomeIcon icon={faUser} className='w-5 h-5 text-blue-400' />
                            <p className='ml-3'>{enrolledStudents} Students Enrolled</p>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                            <FontAwesomeIcon icon={faSchool} className='w-5 h-5 text-blue-400' />
                            <p className='ml-3'>{numChapters} Chapters, {numLessons} Lessons</p>
                        </div>
                    </>
                )}
                <button
                    onClick={handleClick}
                    ref={actionBtRef}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md inline-flex items-center justify-center"
                >
                    {isEnrolled ? 'View Course' : 'Enroll Now'}
                </button>
            </div>
        </div>
    );
}

export default CourseCard;

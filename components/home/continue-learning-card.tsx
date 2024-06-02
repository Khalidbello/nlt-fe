'use cient';

import { faBook, faExclamationTriangle, faSchool } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import Loader from '@/components/multipurpose/loader';
import showClicked from '@/app/utils/clicked';
import { useRouter } from 'next/navigation';
import Welcome from '@/components/home/welcome';
import { headers } from 'next/headers';

interface continueLTypes {
    courseId: number;
    courseName: string;
    title: string;
    chapter: number;
    lesson: number
    lastVisited: string;
    progress: number;
};

const ContinueLearningCard = () => {
    const router = useRouter();
    const [course, setCourse] = useState<continueLTypes>({
        chapter: 0,
        lesson: 0,
        title: 'title',
        courseName: 'course name',
        lastVisited: '20-03-2024',
        courseId: 345,
        progress: 0
    });
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const [showError, setShowError] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const fetchData = async () => {
        setShowLoader(true);
        setShowError(false);

        try {
            const response = await fetch(`${apiHost}/users/continue-last`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                setCourse(data.data);
                setShowLoader(false);
            } else if (response.status === 403) {
                router.push('/sign-in?redirect=true');
            } else {
                throw 'erro somrthing went wrong';
            }
        } catch (err) {
            setShowError(true);
        } finally {
            setShowLoader(false);
        }
    };

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    return (
        <>
            {showLoader ? (
                <div className='mt-10'>
                    <Loader h='h-[8rem]' />
                </div>
            ) : (
                showError ? (
                    <div className="error-container mx-4 bg-red-100 text-red-500 p-4 rounded-lg shadow-md mt-8">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                        <span className="text-lg">Something went wrong</span>
                        <button onClick={() => setReload(!reload)} className="bg-white text-red-500 px-4 py-2 ml-4 rounded-md shadow-md">
                            Reload
                        </button>
                    </div>
                ) : (
                    course === null ? (
                        <Welcome />
                    ) : (
                        <Main course={course} />
                    )
                )
            )}
        </>
    );
};


interface MainProps {
    course: continueLTypes
};

const Main: React.FC<MainProps> = ({ course }) => {
    const router = useRouter();
    const continueBtRef = useRef<null | HTMLButtonElement>(null);


    // function to push user to class view 
    const toClass = () => {
        showClicked(continueBtRef);
        setTimeout(() => router.push(`/course-view?course_id=${course.courseId}`), 250);
    };

    return (
        <div className="bg-blue-50 rounded-lg shadow-md mt-2 mx-2 px-6 py-8 flex flex-col">
            <div className="flex items-center mb-5">
                <div className="w-10 h-10 p-3 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faBook} className='text-white' />
                </div >
                <div className="flex flex-col">
                    <p className="text-xl font-semibold text-gray-800">{course.courseName}</p>
                    <p className="text-gray-600 text-xs">Last Visited: {course.lastVisited.split('T')[0]}</p>
                </div>
            </div >
            <div className="mb-5">
                <p className="mb-2 text-gray-600 flex gap-4 text-sm">
                    <span>Chapter {course.chapter}</span>
                    <span>Lesson {course.lesson}</span>
                </p>
                <p className="font-medium text-gray-800">{course.title}</p>
            </div>
            <div className="flex items-center mb-5">
                <p className="text-gray-600 mr-2">Progress:</p>
                <div className="w-full h-2 rounded-full bg-gray-200">
                    <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${course.progress.toFixed(2)}%` }}
                    />
                </div>
                <p className="text-gray-600 ml-2">{course.progress.toFixed(2)}%</p>
            </div>
            <div className="mb-4">
                <p className="text-gray-600">Continue learning</p>
            </div>
            <button
                ref={continueBtRef}
                onClick={toClass}
                className="bg-blue-500 text-white font-semibold py-2 px-6 rounded"
            >
                Continue Learning
            </button>
        </div >
    )
}
const mockData: continueLTypes = {
    chapter: 3,
    lesson: 9,
    title: 'what to not do with money',
    courseId: 24356,
    courseName: 'Financial Cons',
    lastVisited: '20-02-2023',
    progress: 87.55566
};


export default ContinueLearningCard;
'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Loader from '@/components/multipurpose/loader';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faExclamationTriangle, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import showClicked from '@/app/utils/clicked';
import NewCourseForm from '../main/new-course-form';
import About from '@/components/course-view/about';
import DeletePrompt from './delete-course-propmp';
import CourseStatus from './set-course-status';

interface CourseData {
    courseName: string;
    title: string;
    aboutCourse: string;
    price: number;
    discount: number;
    image: string;
    courseId: number;
    status: string;
}

interface DisplayCourseDataProps {
    courseId: string | null;
    setShowAddChapterBt: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisplayCourseData: React.FC<DisplayCourseDataProps> = ({ courseId, setShowAddChapterBt }) => {
    const router = useRouter();
    const [courseData, setCourseData] = useState<CourseData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);
    const [showEditCourse, setShowEditCourse] = useState<boolean>(false);
    const [showDeleteCoursePrompt, setShowDeleteCoursePrompt] = useState<boolean>(false);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const editCourseDataBtRef = useRef<HTMLButtonElement | null>(null);
    const courseDeleteBtRef = useRef<HTMLButtonElement | null>(null);

    // function to handle click of edit course bt 
    const hadleClick = (): void => {
        if (editCourseDataBtRef.current) showClicked(editCourseDataBtRef.current);
        setTimeout(() => setShowEditCourse(true), 250);
    };

    // function to handle delete bt click
    const deleteBtClicked = () => {
        if (courseDeleteBtRef.current) showClicked(courseDeleteBtRef.current);
        setTimeout(() => setShowDeleteCoursePrompt(true), 250);
    };

    const fetchCourseData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiHost}/admin/course/${courseId}`, { credentials: 'include' });

            if (response.status === 403) router.push('/admin-sign-in?redirect=true');

            if (response.status !== 200) throw 'Something went wrong';

            const data = await response.json();
            setCourseData(data);
            setShowAddChapterBt(true);
        } catch (error) {
            console.error('Error fetching course data:', error);
            setError('Failed to load course data');
            setShowAddChapterBt(false);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (courseId) {
            fetchCourseData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId, reload]);

    if (isLoading) {
        return (
            <div>
                <Loader h='h-[6rem]' />
            </div>
        )
    }

    if (error) {
        return (
            <div className="error-container mx-4 bg-red-100 text-red-500 p-4 rounded-lg shadow-md">
                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                <span className="text-lg">Something went wrong</span>
                <button onClick={() => setReload(!reload)} className="bg-white text-red-500 px-4 py-2 ml-4 rounded-md shadow-md">
                    Reload
                </button>
            </div>
        )
    }

    if (!courseData) {
        return (
            <div className="flex flex-col items-center gap-6 bg-blue-500 px-5 py-5 mx-6 text-white rounded-md">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 h-10" />
                <p className="text-sm font-medium">{`Corse not found.`}</p>
            </div>
        )
    }

    return (
        <>
            <div className="course-data mb-2 mx-3 bg-gray-100 rounded-lg shadow-md p-4">
                <h2 className='text-xl font-medium mb-3'>{courseData.courseName}</h2>
                {
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`data:image/jpeg;base64,${courseData.image}`} alt="Selected Image"
                        className='rounded-xl border-[2px] border-blue-300' />
                }
                <h2 className='mt-3 mb-3 text-xm'>{courseData.title}</h2>
                <About text={courseData.aboutCourse} limit={200} />
                <CourseStatus status={courseData.status} courseId={courseData.courseId} />
                <div className="flex items-center">
                    <p className="text-blue-500 font-medium">Price: ₦{courseData.price}</p>
                    {courseData.discount > 0 && (
                        <p className="ml-4 text-green-700">
                            Discount: {courseData.discount}%
                        </p>
                    )}
                </div>
            </div>
            <div className='flex items-center justify-end gap-3 pr-3'>
                <button ref={editCourseDataBtRef} onClick={hadleClick} className='text-white bg-blue-500 rouded-full px-6 py-2 rounded-full'>Edit</button>
                <button ref={courseDeleteBtRef} onClick={deleteBtClicked} className="bg-red-100 p-1 rounded-xl">
                    <FontAwesomeIcon icon={faTrashCan} className='text-red-500 w-5 h-5' />
                </button>
            </div>
            {showEditCourse && <NewCourseForm show={setShowEditCourse} data={courseData} />}
            {
                // @ts-ignore
                showDeleteCoursePrompt && <DeletePrompt show={setShowDeleteCoursePrompt} courseId={courseId} />
            }
        </>
    );
};

export default DisplayCourseData;

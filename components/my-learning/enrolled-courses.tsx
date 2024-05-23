'use client'

import { useEffect, useState } from "react";
import CourseCard from '@/components/home/course/unit-course';
import Loader from '@/components/multipurpose/loader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

interface courseType {
    course_id: number;
    course_name: string;
    course_title: string;
    course_description: string;
    created_at: string;
    chapterNumber: number;
    lessonNumber: number;
    isEnrolled: boolean;
    lastVisited: string;
    enrolledStudents: number;
    progress: number;
    image: string;
};

const EnrolldedCourses: React.FC = () => {
    const [courses, setCourses] = useState<courseType[]>([]);
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const [showError, setShowError] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const fetchData = async () => {
        try {
            setShowLoader(true);
            setShowError(false);

            const response = await fetch(`${apiHost}/users/enrolled-courses/0/5`, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.status === 200) {
                const data = await response.json();
                setCourses([...courses, ...data.data])
            }
        } catch (err) {
            console.log('error in enrolled courses component', err);
            setShowError(true)
        } finally {
            setShowLoader(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, [reload]);

    return (
        <>
            {showLoader ? (
                <div className="flex justify-center items-center h-[90%]">
                    <Loader h='h-[7rem]' />
                </div>
            ) : (
                <div className="">
                    {showError ? (
                        <div className="error-container mx-4 bg-red-100 text-red-500 p-4 rounded-lg shadow-md mt-8">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                            <span className="text-lg">Something went wrong</span>
                            <button onClick={() => setReload(!reload)} className="bg-white text-red-500 px-4 py-2 ml-4 rounded-md shadow-md">
                                Reload
                            </button>
                        </div>
                    ) : (
                        <div>
                            {true ? (

                                <div className="flex flex-col items-center gap-6 bg-blue-500 px-5 py-5 mt-20 mx-6 text-white rounded-md">
                                    <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 h-10" />
                                    <p className="text-sm font-medium">{`Yo've not enrolled for any courses component yet.`}</p>
                                </div>

                            ) : (
                                courses.map((course, index) => {
                                    console.log(course);
                                    return <CourseCard
                                        key={index}
                                        courseId={course.course_id}
                                        courseName={course.course_name}
                                        title={course.course_title}
                                        description={course.course_description}
                                        enrolledStudents={course.enrolledStudents}
                                        imageUrl={course.image}
                                        numChapters={course.chapterNumber}
                                        numLessons={course.lessonNumber}
                                        isEnrolled={course.isEnrolled}
                                        progress={course.progress}
                                        lastVisited={course.lastVisited}
                                    />
                                })
                            )}
                        </div>
                    )}
                </div>
            )}
        </>

    )
};


export default EnrolldedCourses;
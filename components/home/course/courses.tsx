import { useEffect, useState } from "react";
import CourseCard from "./unit-course";
import Loader from '@/components/multipurpose/loader';
import { tree } from "next/dist/build/templates/app-page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

interface courseType {
    title: string;
    description: string;
    enrolledStudents: number;
    imageUrl: string;
    numChapters: number;
    numLessons: number;
    isEnrolled: boolean;
    progress: number;
    lastVisited: string;
};

const CoursesView: React.FC = () => {
    const [courses, setCourses] = useState<courseType[]>([]);
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const [showError, setShowError] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        setShowLoader(true);
        setShowError(false);

        // simulate data fetching
        setTimeout(() => {
            setCourses(mockData);
            setShowLoader(false);
            //setShowError(true);
        }, 3000)
    }, [reload]);

    return (
        <>
            {showLoader ? (
                <div className="mt-36">
                    <Loader h='h-[8em]' />
                </div>
            ) : (
                <div className="mt-10">
                    <h2 className="mb-4 ml-4 font-semibold">Courses</h2>

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
                            {courses.map((course, index) => {
                                return <CourseCard
                                    key={index}
                                    title={course.title}
                                    description={course.description}
                                    enrolledStudents={course.enrolledStudents}
                                    imageUrl={course.imageUrl}
                                    numChapters={course.numChapters}
                                    numLessons={course.numLessons}
                                    isEnrolled={course.isEnrolled}
                                    progress={course.progress}
                                    lastVisited={course.lastVisited}
                                />
                            })}
                        </div>
                    )}
                </div>
            )}
        </>

    )
};
const mockData: courseType[] = [
    {
        title: 'Finacial freedom 101',
        description: 'basic princeple to living a financialy free life',
        enrolledStudents: 200,
        imageUrl: '',
        numChapters: 4,
        numLessons: 6,
        isEnrolled: false,
        progress: 0,
        lastVisited: '',
    },
    {
        title: 'Finacial freedom 104',
        description: 'advance princeple to living a financialy free life',
        enrolledStudents: 190,
        imageUrl: '',
        numChapters: 4,
        numLessons: 6,
        isEnrolled: false,
        progress: 0,
        lastVisited: '',
    }
]
export default CoursesView;

export type { courseType }
import { useEffect, useRef, useState } from "react";
import CourseCard from "./unit-course";
import Loader from '@/components/multipurpose/loader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import showClicked from "@/app/utils/clicked";

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
    status: string;
};

const CoursesView: React.FC<{ enrolled: boolean }> = ({ enrolled }) => {
    const router = useRouter();
    const [courses, setCourses] = useState<courseType[]>([]);
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const [showError, setShowError] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [pagin, setPagin] = useState<number>(0);
    const [fetchingMore, setFetchingMore] = useState<boolean>(false);
    const [showMoreBt, setShowMoreBt] = useState<boolean>(true);
    const seeMoreBtRef = useRef<HTMLButtonElement | null>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const handleSeeMore = () => {
        if (seeMoreBtRef.current) showClicked(seeMoreBtRef.current);
        setTimeout(() => {
            setFetchingMore(true);
            setPagin(pagin + 5);
        }, 250);
    };

    const fetchCourses = async () => {
        try {
            setShowError(false);
            const response = await fetch(`${apiHost}/users/courses/${pagin}/5`, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.status === 200) {
                const data = await response.json();

                if (data.data.length < 5) setShowMoreBt(false);
                setCourses([...courses, ...data.data]);
                setShowLoader(false);
            } else if (response.status === 403) {
                router.push('/sign-in?redirect=true');
            } else {
                throw 'something went wrong';
            };
        } catch (error) {
            setShowError(true)
        } finally {
            setShowLoader(false);
            setFetchingMore(false);
        }
    };

    useEffect(() => {
        fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload, pagin]);

    if (showLoader) {
        return (
            <div className="mt-36">
                <Loader h='h-[8em]' />
            </div>
        );
    };

    if (showError) {
        return (
            <>
                <h2 className="mb-4 ml-4 font-semibold mt-20">Courses</h2>
                <div className="error-container mx-4 bg-red-100 text-red-500 p-4 rounded-lg shadow-md mt-8">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                    <span className="text-lg">Something went wrong</span>
                    <button onClick={() => { setReload(!reload); setShowLoader(true); }} className="bg-white text-red-500 px-4 py-2 ml-4 rounded-md shadow-md">
                        Reload
                    </button>
                </div>
            </>
        );
    };

    return (
        <div className="mt-10 w-full py-4 overflow-y-auto">
            <h2 className="mb-4 ml-4 font-semibold">Courses</h2>
            <div>
                {courses.map((course, index) => (
                    <CourseCard
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
                        status={course.status}
                    />
                ))}
            </div>

            {showMoreBt && <div className="text-center mt-4">
                {fetchingMore ? (
                    <Loader h="h-[1.5rem]" />
                ) : (
                    <button
                        ref={seeMoreBtRef}
                        onClick={handleSeeMore}
                        className="text-blue-500 text-sm">
                        See More
                    </button>
                )}
            </div>}
        </div >
    );
};


const mockData: courseType[] = [
    {
        course_id: 123,
        course_name: 'Protocol oo1',
        course_title: 'Basics of networking',
        course_description: `"Welcome to Quantum Computing Fundamentals! This course offers an 
    introductory exploration into the fascinating world of quantum computing. Designed for 
    beginners, it provides a foundational understanding of the principles and concepts that 
    underpin quantum computation and quantum information theory.`,
        created_at: '2020-05-13',
        lessonNumber: 40,
        chapterNumber: 4,
        enrolledStudents: 320,
        lastVisited: '2020-05-13',
        progress: 60,
        image: '/images/e-learning-1.jpg',
        isEnrolled: false,
        status: 'active',
    },
    {
        course_id: 123,
        course_name: 'Protocol oo1',
        course_title: 'Basics of networking',
        course_description: `"Welcome to Quantum Computing Fundamentals! This course offers an 
    introductory exploration into the fascinating world of quantum computing. Designed for 
    beginners, it provides a foundational understanding of the principles and concepts that 
    underpin quantum computation and quantum information theory.`,
        created_at: '2020-05-13',
        lessonNumber: 40,
        chapterNumber: 4,
        enrolledStudents: 320,
        lastVisited: '2020-05-13',
        progress: 60,
        image: '/images/e-learning-1.jpg',
        isEnrolled: true,
        status: 'active',
    }
]
export default CoursesView;

export type { courseType }
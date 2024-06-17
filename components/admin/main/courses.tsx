import Loader from "@/components/multipurpose/loader";
import { faExclamationCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import UnitCourse from "./unit-course";
import showClicked from "@/app/utils/clicked";
import RollerAnimation from "@/components/multipurpose/roller-white";


const Courses = () => {
    const router = useRouter();
    const [reload, setReload] = useState<boolean>(true);
    const [showMoreBt, setShowMoreBt] = useState<boolean>(true);
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const [showError, setShowError] = useState<boolean>(false);
    const [fetching, setFetching] = useState<boolean>(false);
    const [pagin, setPagin] = useState<number>(0);
    const [courses, setCourses] = useState<[]>([]);
    const seeMoreBtRef = useRef<null | HTMLButtonElement>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const seeMoreClicked = () => {
        if (seeMoreBtRef.current) showClicked(seeMoreBtRef.current);
        console.log(courses)
        setTimeout(() => setPagin(pagin + 5), 230);
    };

    const fetchCourses = async () => {
        try {
            setShowError(false);
            setFetching(true);
            const response = await fetch(`${apiHost}/admin/courses/${pagin}/5`, { credentials: 'include' });

            if (response.status === 403) return router.push('/admin-sign-in?redirect=true');
            if (response.status !== 200) throw 'something went wrong';

            const data = await response.json();

            if (data.length < 5) setShowMoreBt(false);

            // @ts-ignore
            const updatedCourses: [] = [...courses, ...data];
            setCourses(updatedCourses);
        } catch (err) {
            console.log('error occured in admin fetch courses', err);
            setShowError(true);
        } finally {
            setFetching(false);
            setShowLoader(false);
        }
    };

    useEffect(() => {
        fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload, pagin]);

    if (showLoader) {
        return (
            <div className="w-full h-[90%] flex items-center justify-center">
                <Loader h='h-[6rem]' />
            </div>
        )
    }

    if (showError) {
        return (
            <div className="error-container mx-4 bg-red-100 text-red-500 p-4 rounded-lg shadow-md mt-24">
                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                <span className="text-lg">Something went wrong</span>
                <button onClick={() => { setReload(!reload); setPagin(0) }} className="bg-white text-red-500 px-4 py-2 ml-4 rounded-md shadow-md">
                    Reload
                </button>
            </div>
        )
    };

    if (courses.length === 0) {
        return (
            <div className="flex flex-col items-center gap-6 bg-blue-500 px-5 py-5 mt-24 mx-6 text-white rounded-md">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 h-10" />
                <p className="text-sm font-medium">{`Yo've not enrolled for any courses component yet.`}</p>
            </div>
        )
    };

    return (
        <div className="mt-20">
            {courses.map((course: any, index) => (
                <UnitCourse
                    key={index}
                    courseId={course.courseId}
                    courseName={course.courseName}
                    courseDescription={course.courseDescription}
                    image={course.image}
                    numberOfEnrolledStudents={course.numberOfEnrolledStudents}
                    numberOfChapters={course.numberOfChapters}
                    numberOfLessons={course.numberOfLessons}
                    coursetTitle={course.coursetTitles}
                />
            ))}
            {
                showMoreBt && (
                    <div className="text-center text-sm text-blue-500 mt-4">
                        <button ref={seeMoreBtRef} onClick={seeMoreClicked}>
                            {fetching ? (
                                <Loader h='1-[rem]' />
                            ) : (
                                'See More'
                            )}
                        </button>
                    </div>
                )
            }
        </div >
    )
};

export default Courses;
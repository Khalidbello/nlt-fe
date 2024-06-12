import showClicked from "@/app/utils/clicked";
import Loader from "@/components/multipurpose/loader";
import { faEdit, faExclamationCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LessonsProps {
    courseId: number;
    chapterId: number;
};

interface lessonsType {
    lesson_id: number;
    lesson_number: number;
    lesson_title: string;
    chapter_number: number;
    course_id: number;
    chapter_id: number;
};

const Lessons: React.FC<LessonsProps> = ({ courseId, chapterId }) => {
    const router = useRouter();
    const [lessons, setLessons] = useState<lessonsType[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [reload, setReload] = useState<boolean>(false);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const handleShowLesson = (e: React.MouseEvent<HTMLButtonElement>, lessonId: number) => {
        if (e.currentTarget) showClicked(e.currentTarget);
        setTimeout(() => router.push(`/admin/lesson?lessonId=${lessonId}&chapterid=${chapterId}&courseId=${courseId}`), 250);
    };

    const fetchLessons = async () => {
        setIsFetching(true);
        setError('');

        try {
            const response = await fetch(`${apiHost}/admin/lessons/${courseId}/${chapterId}`, { credentials: 'include' });

            if (response.status === 403) router.push('/sign-in?redirected=true');
            if (response.status !== 200) throw 'something went wrong';

            const data = await response.json();
            setLessons(data.lessons);
        } catch (err) {
            console.log('error in etching lessons ', err);
            setError('An error occured please try again');
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchLessons();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    if (isFetching) {
        return (
            <div className="">
                <Loader h='h-[6rem]' />
            </div>
        )
    };

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
    };

    if (!lessons || lessons.length < 1) {
        return (
            <div className="flex flex-col items-center gap-6 bg-blue-500 px-5 py-5 mx-6 text-white rounded-md">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 h-10" />
                <p className="text-sm font-medium">{`No lessons. Add a lesson`}</p>
            </div>
        )
    }
    return (

        <div className="mx-2">
            {lessons.map((lesson: lessonsType, index: number) => (
                <p key={index} className='mb-3 bg-blue-100 rounded-xl p-3 flex items-center justify-between'>
                    <div>
                        <p className="pl-3 text-sm">lesson {lesson.lesson_number}</p>
                        <p className="font-medium"> {lesson.lesson_title}</p>
                    </div>
                    <div>
                        <button onClick={(e) => handleShowLesson(e, lesson.lesson_id)}> <FontAwesomeIcon icon={faEdit} className="w-5 h-5 text-blue-500" /></button>
                    </div>
                </p>
            ))
            }
        </div>
    )
};

export default Lessons;
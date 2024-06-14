import Loader from "@/components/multipurpose/loader";
import { faExclamationCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LessonDataProps {
    courseId: number;
    ChapterId: number;
    lessonId: number;
}

const LessonData: React.FC<LessonDataProps> = ({ courseId, ChapterId, lessonId }) => {
    const router = useRouter();
    const [info, setInfo] = useState<any>('');
    const [error, setError] = useState<string>('');
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [reload, setReload] = useState<boolean>(false);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const fetchChapterData = async () => {
        setIsFetching(true);
        setError('');

        try {
            const response = await fetch(`${apiHost}/admin/lesson-data/${courseId}/${ChapterId}/${lessonId}`, { credentials: 'include' });

            if (response.status === 403) return router.push('/sign-in?redirected=true');
            if (response.status !== 200) throw 'something went wrong.';

            const data = await response.json();
            setInfo(data);
        } catch (err) {
            console.log('error in fetch lesson chapter', err);
            setError('Something went wrong plese try again');
        } finally {
            setIsFetching(false);
        };
    };

    useEffect(() => {
        fetchChapterData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    if (isFetching) return <Loader h='h-[6rem]' />;

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

    if (!info) {
        return (
            <div className="flex flex-col items-center gap-6 bg-blue-500 px-5 py-5 mx-6 text-white rounded-md">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 h-10" />
                <p className="text-sm font-medium">{`Lesson not found.`}</p>
            </div>
        )
    };

    return (
        <div className="p-3 m-3  mb-6 bg-blue-100 rounded-xl">
            <p className="font-medium text-xl mb-2">{info.courseName}</p>
            <p className="font-medium">chapter {info.chapterNumber}</p>
            <p className="text-sm font-medium">{info.chapterTitle}</p>
        </div>
    );
};

export default LessonData;
import Loader from "@/components/multipurpose/loader";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface LessonContentProps {
    courseId: number;
    chapterId: number;
    lessonId: number;
};

const LessonContent: React.FC<LessonContentProps> = ({ courseId, chapterId, lessonId }) => {
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [info, setInfo] = useState<any>('');
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const fetchChapterData = async () => {
        setIsFetching(true);
        setError('');

        try {
            const response = await fetch(`${apiHost}/admin/lesson-content/${courseId}/${chapterId}/${lessonId}`, { credentials: 'include' });

            if (response.status === 403) return router.push('/sign-in?redirected=true');
            if (response.status !== 200) throw 'Something went wrong';

            const data = await response.json();
            setInfo(data);
        } catch (err) {
            console.log('error in fetching lesson content', err);
            setError('Something went wrong');
        } finally {
            setIsFetching(false);
        };
    };

    useEffect(() => {
        fetchChapterData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    if (isFetching) {
        return (
            <div className="mt-10">
                <Loader h='h-[6rem]' />
            </div>
        )
    };

    if (error) {
        return (
            <div className="error-container mx-4 bg-red-100 text-red-500 p-4 rounded-lg shadow-md mt-10">
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
            <div></div>
        );
    };

    return (
        <div className="bg-white shadow-md mx-3 rounded-xl p-3 border-[2px] border-gray-100">
            <p className="mb-3">
                <span className="font-medium"> Lesson {info.lessonNumber}</span>
                <span>{info.lessonTitle}</span>
            </p>
            <p className="mb-3">
                <h3 className="font-medium">Opening note</h3>
                <span>{info.openingNote}</span>
            </p>
            <p className="mb-3">
                <h3 className="font-medium">Lecture</h3>
                <audio src={`data:audio/mpeg;base64,${info.audio}`} controls></audio>
            </p>
            <p>
                <h3 className="font-medium">Closing note</h3>
                <span>{info.closingNote}</span>
            </p>
        </div>
    );
};

export default LessonContent;
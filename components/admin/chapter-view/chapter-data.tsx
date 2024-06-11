'use client';

import Loader from "@/components/multipurpose/loader";
import { faExclamationCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AddChapter from "../course-view/add-new-Chapter";
import showClicked from "@/app/utils/clicked";

interface ChapterData {
    courseId: number;
    chapterId: number;
}

interface chapterDataType {
    chapterId: number;
    chapterTitle: string;
    chapterNumber: number;
    numOfLessons: Number;
    courseName: string;
}

const ChapterData: React.FC<ChapterData> = ({ courseId, chapterId }) => {
    const router = useRouter();
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [reload, setReload] = useState<boolean>(false);
    const [showEditChapter, setShowEditChapter] = useState<boolean>(false);
    const [chapterData, setChapterData] = useState<chapterDataType>({
        chapterId: 0,
        chapterTitle: '',
        chapterNumber: 0,
        numOfLessons: 0,
        courseName: '',
    });
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const editCourseBtRef = useRef<HTMLButtonElement | null>(null);

    const handleShowEditCourse = () => {
        if (editCourseBtRef.current) showClicked(editCourseBtRef.current);
        setTimeout(() => setShowEditChapter(true), 250);
    };

    const fetchChapterData = async () => {
        setIsFetching(true);
        setError('');

        try {
            const response = await fetch(`${apiHost}/admin/chapter/${courseId}/${chapterId}`, { credentials: 'include' })

            if (response.status === 403) return router.push('/sign-in?redirected=true');
            if (response.status !== 200) throw 'Something went wrong fetching chapter data';

            const data = await response.json();
            setChapterData(data);
        } catch (err) {
            console.log('error in fetch course data', err);
            setError('Something went wron. please try again.');
        } finally {
            setIsFetching(false);
        };
    };

    useEffect(() => {
        fetchChapterData();
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

    if (!chapterData.chapterId) {
        return (
            <div className="flex flex-col items-center gap-6 bg-blue-500 px-5 py-5 mx-6 text-white rounded-md">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 h-10" />
                <p className="text-sm font-medium">{`No chapters. Add a chapter`}</p>
            </div>
        )
    };

    return (
        <>
            <div className="px-2 mb-6">
                <p className="text-lg font-medium px-2 mb-2">{chapterData.courseName}</p>
                <div className="px-2 py-2 bg-blue-100 rounded-xl flex items-center justify-between">
                    <div>
                        <p> Chapter {chapterData.chapterNumber}</p>
                        <p className="font-medium">{chapterData.chapterTitle}</p>
                    </div>
                    <div className="text-right">
                        <button ref={editCourseBtRef} onClick={handleShowEditCourse} className="text-white bg-blue-500 rounded-full px-5 py-2">Edit</button>
                    </div>
                </div>
            </div>

            {showEditChapter && <AddChapter show={setShowEditChapter} courseId={courseId} data={chapterData} />}
        </>
    )
};

export default ChapterData;
'use client';

import showClicked from "@/app/utils/clicked";
import Loader from "@/components/multipurpose/loader";
import { faEdit, faExclamationCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ChapterProps {
    courseId: string | null;
}

interface chapter {
    chapterNumber: number;
    title: string;
    numberOfLessons: number;
    chapterId: number;
}

const Chapters: React.FC<ChapterProps> = ({ courseId }) => {
    const router = useRouter();
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const [reload, setReload] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [chapters, setChapters] = useState<chapter[]>([]);

    const handleShowChapter = (e: React.MouseEvent<HTMLButtonElement>, chapterId: number) => {
        if (e.currentTarget) showClicked(e.currentTarget);
        setTimeout(() => router.push(`/admin/chapter-view?courseId=${courseId}&chapterId=${chapterId}`), 250);
    };

    const fetchChapters = async () => {
        setIsFetching(true);
        setError(false);

        try {
            const response = await fetch(`${apiHost}/admin/chapters/${courseId}`, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.status === 403) return router.push('/sign-in?redirect=true');

            if (response.status !== 200) throw 'something went wrong';

            const data = await response.json();
            console.log('data in chapters', data);
            setChapters(data);
        } catch (err) {
            console.log('error ccured in fetch chapters', err);
            setError(true);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchChapters()
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

    if (chapters.length < 1) {
        return (
            <div className="flex flex-col items-center gap-6 bg-blue-500 px-5 py-5 mx-6 text-white rounded-md">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 h-10" />
                <p className="text-sm font-medium">{`No chapters. Add a chapter`}</p>
            </div>
        )
    };

    return (
        <div>
            <div className="mx-2">
                {chapters.map((chapter: chapter, index: number) => (
                    <p key={index} className='mb-3 bg-blue-100 rounded-xl p-3 flex items-center justify-between'>
                        <div>
                            <p>{chapter.chapterNumber}. {chapter.title}</p>
                            <p className="pl-3 text-sm">{chapter.numberOfLessons} lessons</p>
                        </div>
                        <div>
                            <button onClick={(e) => handleShowChapter(e, chapter.chapterId)}> <FontAwesomeIcon icon={faEdit} className="w-5 h-5 text-blue-500" /></button>
                        </div>
                    </p>
                ))}
            </div>
        </div>
    )
}


export default Chapters;
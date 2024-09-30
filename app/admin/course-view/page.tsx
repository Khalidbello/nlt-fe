'use client';

import showClicked from "@/app/utils/clicked";
import AddChapter from "@/components/admin/course-view/add-new-Chapter";
import Chapters from "@/components/admin/course-view/chapters";
import DisplayCourseData from "@/components/admin/course-view/course-data";
import Header from "@/components/multipurpose/header";
import Loader from "@/components/multipurpose/loader";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useState, useRef, Suspense } from "react";

const
    CourseView = () => {
        const searchParams = useSearchParams();
        const courseId = searchParams.get('courseId');
        const [showAddChapterBt, setShowAddChapterBt] = useState<boolean>(false);
        const [showAddChapter, setShowAddChapter] = useState<boolean>(false);
        const btRef = useRef<HTMLButtonElement | null>(null);

        const handleAddChapterBtClick = () => {
            if (btRef.current) showClicked(btRef.current);
            setTimeout(() => setShowAddChapter(true), 250);
        };

        return (
            <div className="w-full h-full pt-20 relative overflow-auto">
                <Header heading='Course view' />
                <DisplayCourseData courseId={courseId} setShowAddChapterBt={setShowAddChapterBt} />

                <h3 className="mt-8 mb-4 font-medium mx-4">Chapters</h3>
                <Chapters courseId={courseId} />

                {showAddChapterBt && (
                    <button ref={btRef} onClick={handleAddChapterBtClick} className='fixed bottom-4 right-4 bg-blue-500 px-4 py-2 rounded-full text-white border-[1px] border-white'>
                        <FontAwesomeIcon icon={faPlus} className='w-5 h-5 text-white' /> Chapter
                    </button>
                )}

                {
                    // @ts-ignore
                    showAddChapter && <AddChapter show={setShowAddChapter} courseId={courseId} />
                }
                <div className="h-20"></div>
            </div>
        );
    };


const Page: React.FC = () => {
    return (
        <Suspense fallback={<Loader h={'h-[5rem]'} />}>
            <CourseView />
        </Suspense>
    );
};

export default Page;
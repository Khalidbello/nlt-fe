'use client';

import AddLectureBt from "@/components/admin/chapter-view/add-lectrue-bt";
import AddLesson from "@/components/admin/chapter-view/add-lesson-form";
import ChapterData from "@/components/admin/chapter-view/chapter-data";
import Lessons from "@/components/admin/chapter-view/lessons";
import Header from "@/components/multipurpose/header";
import Loader from "@/components/multipurpose/loader";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

interface ChapterView {
    courseId: number;
    chapterId: number;
}

const ChapterView: React.FC = () => {
    const searchPrams = useSearchParams();
    const courseId = searchPrams.get('courseId');
    const chapterId = searchPrams.get('chapterId');
    const [showAddLesson, setShowAddLesson] = useState<boolean>(false);
    const [showAddLessonBt, setShowAddLessonBt] = useState<boolean>(false);

    return (
        <div className="w-ful h-full relative pt-20">
            <Header heading="Chapter view" />
            {
                // @ts-ignore
                <ChapterData courseId={courseId} chapterId={chapterId} setShowAddLessonBt={setShowAddLessonBt} />
            }

            <h2 className="mb-2 px-3 font-medium">Lessons</h2>
            {
                // @ts-ignore
                <Lessons courseId={courseId} chapterId={chapterId} />

            }
            {
                // @ts-ignore
                showAddLesson && <AddLesson courseId={courseId} chapterId={chapterId} show={setShowAddLesson} />
            }

            {showAddLessonBt && <AddLectureBt show={setShowAddLesson} />}

            <div className="h-20"></div>
        </div>
    )
}

const Page: React.FC = () => {
    return (
        <Suspense fallback={<Loader h={'h-[5rem]'} />}>
            <ChapterView />
        </Suspense>
    );
};

export default Page;
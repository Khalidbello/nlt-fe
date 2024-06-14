'use client';

import LessonData from "@/components/admin/lesson-view/lesson-data";
import LessonContent from "@/components/admin/lesson-view/lesson-content";
import Header from "@/components/multipurpose/header";
import { useSearchParams } from "next/navigation";

const LessonView = () => {
    const searchPrams = useSearchParams();
    const courseId = searchPrams.get('courseId');
    const chapterId = searchPrams.get('chapterId');
    const lessonId = searchPrams.get('lessonId');

    return (
        <div className="w-full h-full pt-20">
            <Header heading="Lesson view" />
            {
                // @ts-ignore
                <LessonData courseId={courseId} ChapterId={chapterId} lessonId={lessonId} />
            }
            {
                // @ts-ignore
                <LessonContent courseId={courseId} chapterId={chapterId} lessonId={lessonId} />
            }
        </div>
    );
};

export default LessonView;
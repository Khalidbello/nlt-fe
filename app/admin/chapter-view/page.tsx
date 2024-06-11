'use client';

import ChapterData from "@/components/admin/chapter-view/chapter-data";
import Lessons from "@/components/admin/chapter-view/lessons";
import Header from "@/components/multipurpose/header";
import { useSearchParams } from "next/navigation";

interface ChapterView {
    courseId: number;
    chapterId: number;
}

const ChapterView: React.FC = () => {
    const searchPrams = useSearchParams();
    const courseId = searchPrams.get('courseId');
    const chapterId = searchPrams.get('chapterId');

    return (
        <div className="w-ful h-full relative pt-20">
            <Header heading="Chapter view" />
            {
                // @ts-ignore
                <ChapterData courseId={courseId} chapterId={chapterId} />
            }

            <h2 className="mb-2 px-3 font-medium">Lessons</h2>
            {
                // @ts-ignore
                <Lessons courseId={courseId} chapterId={chapterId} />

            }
        </div>
    )
}

export default ChapterView;
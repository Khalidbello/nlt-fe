'use client';

import LessonData from "@/components/admin/lesson-view/lesson-data";
import LessonContent from "@/components/admin/lesson-view/lesson-content";
import Header from "@/components/multipurpose/header";
import { useSearchParams } from "next/navigation";
import AddQuizBt from "@/components/admin/lesson-view/add-quiz-bt";
import { useState } from "react";
import AddQuizForm from "@/components/admin/lesson-view/add-quiz-form";
import QuizView from "@/components/admin/lesson-view/quiz-view";

const LessonView = () => {
    const searchPrams = useSearchParams();
    const courseId = searchPrams.get('courseId');
    const chapterId = searchPrams.get('chapterId');
    const lessonId = searchPrams.get('lessonId');
    const [showAddQuiz, setShowAddQuiz] = useState<boolean>(false);
    const [quizReloader, setQuizReloader] = useState<boolean>(false);

    return (
        <div className="w-full h-full pt-20 relative">
            <Header heading="Lesson view" />
            {
                // @ts-ignore
                <LessonData courseId={courseId} ChapterId={chapterId} lessonId={lessonId} />
            }
            {
                // @ts-ignore
                <LessonContent courseId={courseId} chapterId={chapterId} lessonId={lessonId} />
            }

            {
                // @ts-ignore
                showAddQuiz && <AddQuizForm courseId={courseId} lessonId={lessonId} chapterId={chapterId} hide={setShowAddQuiz} reload={quizReloader} setReload={setQuizReloader} />
            }

            {
                // @ts-ignore
                <QuizView courseId={courseId} chapterId={chapterId} lessonId={lessonId} reloader={quizReloader} />
            }
            <AddQuizBt show={setShowAddQuiz} />
        </div>
    );
};


export default LessonView;
'use client';

import React, { useEffect, useRef, useState } from "react";
import showClicked from '@/app/utils/clicked';
import Loader from '@/components/multipurpose/loader';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

interface LessonsProps {
    chapterId: number;
    courseId: number;
    lessons: LessonType[];
    setLessons: React.Dispatch<React.SetStateAction<LessonType[]>>;
    currentChapter: number;
    currentLesson: number;
}

const Lessons: React.FC<LessonsProps> = ({ chapterId, courseId, lessons, setLessons, currentChapter, currentLesson }) => {
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const router = useRouter();
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const fetchLessons = async () => {
        try {
            setShowLoader(true);
            setShowError(false);
            const response = await fetch(`${apiHost}/users/lessons/${chapterId}/${courseId}`, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.status === 200) {
                const data = await response.json()
                setLessons(data.data);
            }
            throw 'somehing went wrong';
        } catch (err) {
            console.log('errror in fetch leosns');
            setShowError(true);
        } finally {
            setShowLoader(false);
            console.log('in lessons.............');
        }
    };

    useEffect(() => {
        if (lessons.length === 0) fetchLessons();
    }, []);

    return (
        <>
            {showLoader ? (
                <Loader h='h-10' />
            ) : (
                <div>
                    {lessons.map((lesson, index) => <Lesson key={index} lesson={lesson} router={router} currentChapter={currentChapter} currentLesson={currentLesson} />)}
                </div>
            )}
        </>
    )
}

interface LessonProps {
    lesson: LessonType;
    router: AppRouterInstance;
    currentChapter: number;
    currentLesson: number;
}

interface LessonType {
    lesson_id: number;
    lesson_number: number;
    lesson_title: number;
    chapter_number: number;
    course_id: number;
    chapter_id: number;
}

const Lesson: React.FC<LessonProps> = ({ lesson, router, currentChapter, currentLesson }) => {
    const optionRef = useRef<HTMLLIElement | null>(null);

    const toLecture = () => {
        console.log(lesson, currentChapter, currentLesson, lesson.lesson_number)
        if (lesson.chapter_number < currentChapter) {
            showClicked(optionRef);
            setTimeout(() => {
                router.push(`/lecture?courseId=${lesson.course_id}&chapterId=${lesson.chapter_id}&chapterNumber=${lesson.chapter_number}&lessonNumber=${lesson.lesson_number}`);
            }, 250);
        } else if (lesson.chapter_number === currentChapter && lesson.lesson_number <= currentLesson) {
            showClicked(optionRef);
            setTimeout(() => {
                router.push(`/lecture?courseId=${lesson.course_id}&chapterId=${lesson.chapter_id}&chapterNumber=${lesson.chapter_number}&lessonNumber=${lesson.lesson_number}`);
            }, 250);
        } else {
            console.log('user cannot access lesson in lessons');
        };
    };

    return (
        <li
            ref={optionRef}
            onClick={toLecture}
            className="flex items-center gap-3 py-2 border-b border-gray-200">
            <div
                className={`w-2 h-2 rounded-full mr-2 
                ${lesson.chapter_number < currentChapter ? "bg-blue-500" :
                        (lesson.chapter_number === currentChapter && currentLesson > lesson.lesson_number ? "bg-blue-500" :
                            (lesson.chapter_number === currentChapter && lesson.lesson_number === currentLesson ? "bg-green-500" : "bg-gray-500"))}`}
            ></div>

            <div className={`${lesson.chapter_number < currentChapter ? 'text-blue-400' :
                (lesson.chapter_number === currentChapter && currentLesson > lesson.lesson_number ? 'text-blue-500' :
                    (lesson.chapter_number === currentChapter && lesson.lesson_number === currentLesson ? 'text-green-600' : 'text-gray-600'))}`}
            >{lesson.lesson_title}</div>
        </li >
    );
};


export default Lessons;
export type { LessonType }
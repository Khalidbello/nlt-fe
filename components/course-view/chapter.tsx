'use client';

import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Lessons, { LessonType } from "./lessons";


interface ChapterProps {
    chapter: chapterType;
    lessonNumber: number;
    courseId: number;
    currentChapter: number;
    currentLesson: number;
}

interface chapterType {
    chapter_id: number;
    chapter_title: string;
    chapter_number: number;
    completed: 'ongoing' | 'finished' | undefined;
}


const Chapter: React.FC<ChapterProps> = ({ chapter, lessonNumber, courseId, currentChapter, currentLesson }) => {
    const router = useRouter();
    const [showLessons, setShowLessons] = useState(false);
    const [lessons, setLessons] = useState<LessonType[]>([]);

    const toggleLesson = () => {
        setShowLessons(!showLessons);
    };

    return (
        <div className="relative bg-white rounded-lg p-4 mb-5 shadow-md mx-4">
            {/* Completed badge */}
            {chapter.completed === 'finished' ? (
                <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="absolute top-2 right-2 text-green-500"
                />
            ) : (
                chapter.completed === 'ongoing' ? (
                    <div className="w-2 h-2 rounded-full bg-green-500 absolute top-3 right-3"></div>
                ) : (
                    ''
                )
            )}

            {/* Chapter title */}
            <h3 className="text-lgF font-medium text-gray-800 mb-2">{chapter.chapter_number}. {chapter.chapter_title}</h3>

            {/* Lesson count and toggle */}
            <div
                onClick={toggleLesson}
                className="flex justify-between items-center cursor-pointer pl-2"
            >
                <span className="text-gray-700">{lessonNumber} Lessons</span>
                <FontAwesomeIcon
                    icon={showLessons ? faArrowUp : faArrowDown}
                    className="text-blue-500"
                />
            </div>

            {/* Lessons list  would rewrite thsi loggic*/}
            {showLessons && (
                <Lessons
                    chapterId={chapter.chapter_id}
                    courseId={courseId}
                    lessons={lessons}
                    setLessons={setLessons}
                    currentChapter={currentChapter}
                    currentLesson={currentLesson}
                />
            )}
        </div>
    );
};

export default Chapter;

export type { chapterType }
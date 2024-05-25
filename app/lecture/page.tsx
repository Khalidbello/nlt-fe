'use client';

import Head from '@/components/lecture/head';
import Note from '@/components/lecture/note';
import Audio from '@/components/lecture/audio';
import QuizButton from '@/components/lecture/quiz-bt';
import Quiz from '@/components/lecture/quiz';
import { useEffect, useRef, useState } from 'react';
import Loader from '@/components/multipurpose/loader';
import showClicked from '@/app/utils/clicked';
import { useSearchParams } from 'next/navigation';
import Chapter from '@/components/course-view/chapter';


interface datainterface {
    course_id: number;
    course_name: string;
    chapter_id: number;
    open_note: string;
    close_note: string;
    chapter_number: number;
    lesson_number: number;
    lesson_title: string;
    lesson_id: number;
    audio: null;
};

const Lecture: React.FC = () => {
    const [data, setData] = useState<datainterface>({
        course_id: 0,
        course_name: '',
        chapter_id: 0,
        open_note: '',
        close_note: '',
        chapter_number: 0,
        lesson_number: 0,
        lesson_title: '',
        lesson_id: 0,
        audio: null,
    });
    const [loader, setShowLoader] = useState<boolean>(true);
    const [showQuiz, setShowQuiz] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const courseId = searchParams.get('courseId');
    const chapterId = searchParams.get('chapterId');
    const chapterNumber = searchParams.get('chapterNumber');
    const lessonNumber = searchParams.get('lessonNumber');

    const startQuiz = () => {
        setTimeout(() => setShowQuiz(true), 250);
    };

    const fetchLecture = async () => {
        try {
            setShowLoader(true);
            const response = await fetch(`${apiHost}/users/lecture/${courseId}/${chapterId}/${chapterNumber}/${lessonNumber}`, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.status === 200) {
                const data = await response.json();
                if (!data.data) throw 'empty response recieved';
                setData(data.data)
            };
            throw 'something went wrong';
        } catch (err) {
            setShowError(true)
        } finally {
            setShowLoader(false);
        }
    }

    useEffect(() => {
        fetchLecture()
    }, [searchParams]);

    return (
        <div className="w-full h-full pt-20">
            <Head chapter={data.chapter_number} lesson={data.lesson_number} />
            {loader ? (
                <div className='h-[90%] flex items-center justify-center'>
                    <Loader h='h-[8rem]' />
                </div>
            ) : (
                <>
                    <Note text={data.open_note} />
                    <Audio src={'/audio/test.m4a'} />
                    <Note text={data.close_note} />
                    <div className='h-10'></div>

                    {!showQuiz && <QuizButton onClick={startQuiz} />}
                    {showQuiz && <Quiz courseId={data.course_id} chapterId={data.chapter_id} lessonId={data.lesson_id} />}

                    <div className='h-10'></div>
                </>
            )}
        </div >
    );
};


const mockdata: datainterface = {
    course_id: 123,
    chapter_id: 23,
    course_name: 'Cash flow 101',
    open_note: " This lesson focuses on measurement in quantum computing and how observing a quantum state affects it.",
    close_note: "Understanding measurement is crucial, as it collapses a quantum state to a definite value, impacting quantum computation outcomes.",
    chapter_number: 2,
    lesson_number: 2,
    lesson_title: " Quantum Gates and Circuits",
    lesson_id: 5,
    audio: null
}



export default Lecture;
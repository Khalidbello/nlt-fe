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
import Link from 'next/link';
import NoAccess from '@/components/lecture/access-denied';
import EnrollmentOpt from '@/components/course-view/enrollment-option';


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
    const [showMakePayment, setShowMakePayment] = useState<boolean>(false);
    const [showLecture, setShowLecture] = useState<boolean>(false);
    const [options, setOptions] = useState<1 | 2>(2);
    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId');
    const chapterId = searchParams.get('chapterId');
    const chapterNumber = searchParams.get('chapterNumber');
    const lessonNumber = searchParams.get('lessonNumber');
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const startQuiz = () => {
        setTimeout(() => setShowQuiz(true), 250);
    };

    const handleSubmit = () => {

    }

    const fetchLecture = async () => {
        try {
            setShowLoader(true);
            setShowMakePayment(false);
            setShowError(false);
            const response = await fetch(`${apiHost}/users/lecture/${courseId}/${chapterId}/${chapterNumber}/${lessonNumber}`, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.status === 200) {
                const data = await response.json();
                if (!data.data) throw 'empty response recieved';
                setData(data.data);
                setShowLecture(true);
            } else if (response.status === 401) {
                const data = await response.json();

                if (data.status === 'endOfFree') {
                    setOptions(2);
                    setShowMakePayment(true);
                } else {
                    setOptions(1);
                    setShowMakePayment(true);
                }
            } else {
                throw 'something went wrong';
            };
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
                    {showLecture && (
                        <>
                            <Link href={`course-view?course_id=${data.course_id}`}>
                                <div className='text-xl font-medium mx-4 mb-4'>{data.course_name}</div>
                            </Link>
                            <Note text={data.open_note} />
                            <Audio src={'/audio/test.m4a'} />
                            <Note text={data.close_note} />

                            <div className='h-10'></div>

                            {!showQuiz && <QuizButton onClick={startQuiz} />}
                            {showQuiz && (
                                <>
                                    <h3 className='mb-3 text-center border-2 border-gray-100 rounded-xl px-4 py-2'>Quiz</h3>
                                    <Quiz courseId={data.course_id} chapterId={data.chapter_id} lessonId={data.lesson_id} setShowQuiz={setShowQuiz} />
                                </>
                            )}

                            <div className='h-10'></div>
                        </>
                    )}

                    {/* {showNoAcess && <NoAccess />} */}

                    {showMakePayment && <EnrollmentOpt courseId={parseInt(courseId)} hide={setShowMakePayment} options={options} />}
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
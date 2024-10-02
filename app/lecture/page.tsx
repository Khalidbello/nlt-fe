'use client';

import Head from '@/components/lecture/head';
import Note from '@/components/lecture/note';
import Audio from '@/components/lecture/audio';
import QuizButton from '@/components/lecture/quiz-bt';
import Quiz from '@/components/lecture/quiz';
import { Suspense, useEffect, useState } from 'react';
import Loader from '@/components/multipurpose/loader';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link'; import EnrollmentOpt from '@/components/course-view/enrollment-option';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import HomeBt from '@/components/multipurpose/home-bt';

interface DataInterface {
    course_id: number;
    course_name: string;
    chapter_id: number;
    opening_note: string;
    closing_note: string;
    chapter_number: number;
    lesson_number: number;
    lesson_title: string;
    lesson_id: number;
    audio: string | null;
}

const Lecture: React.FC = () => {
    const router = useRouter();
    const [data, setData] = useState<DataInterface>({
        course_id: 0,
        course_name: '',
        chapter_id: 0,
        opening_note: '',
        closing_note: '',
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
    const [reload, setReload] = useState<boolean>(false);

    // Use Suspense for searchParams
    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId') || '';
    const chapterId = searchParams.get('chapterId') || '';
    const chapterNumber = searchParams.get('chapterNumber') || '';
    const lessonNumber = searchParams.get('lessonNumber') || '';
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const startQuiz = () => setTimeout(() => setShowQuiz(true), 250);

    const fetchLecture = async () => {
        try {
            setShowLoader(true);
            setShowMakePayment(false);
            setShowError(false);
            const response = await fetch(
                `${apiHost}/users/lecture/${courseId}/${chapterId}/${chapterNumber}/${lessonNumber}`,
                { method: 'GET', credentials: 'include' }
            );

            if (response.status === 200) {
                const data = await response.json();
                if (!data.data) throw new Error('Empty response received');
                setData(data.data);
                setShowLecture(true);
            } else if (response.status === 401) {
                const data = await response.json();
                setOptions(data.status === 'endOfFree' ? 2 : 1);
                setShowMakePayment(true);
            } else if (response.status === 403) {
                router.push('/sign-in?redirect=true');
            } else {
                throw new Error('Something went wrong');
            }
        } catch (err) {
            setShowError(true);
        } finally {
            setShowLoader(false);
        }
    };

    useEffect(() => {
        fetchLecture();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, reload]);

    return (
        <div className="w-full h-full pt-20">
            <HomeBt />
            <Head chapter={data.chapter_number} lesson={data.lesson_number} />
            {loader ? (
                <div className="h-[90%] flex items-center justify-center">
                    <Loader h="h-[8rem]" />
                </div>
            ) : showError ? (
                <div className="error-container mx-4 bg-red-100 text-red-500 p-4 rounded-lg shadow-md mt-20">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                    <span className="text-lg">Something went wrong</span>
                    <button
                        onClick={() => setReload(!reload)}
                        className="bg-white text-red-500 px-4 py-2 ml-4 rounded-md shadow-md"
                    >
                        Reload
                    </button>
                </div>
            ) : (
                
                <>
                    {showLecture && (
                        <>
                            <Link href={`course-view?course_id=${data.course_id}`}>
                                <div className="text-xl text-blue-500 font-medium mx-4 mb-4">{data.course_name}</div>
                            </Link>
                            <Note text={data.opening_note} />
                            {data.audio && <Audio src={data.audio} />}
                            <Note text={data.closing_note} />

                            {!showQuiz && <QuizButton onClick={startQuiz} />}
                            {showQuiz && (
                                <>
                                    <h3 className="mb-3 text-center border-2 border-gray-100 rounded-xl px-4 py-2">
                                        Quiz
                                    </h3>
                                    <Quiz
                                        courseId={data.course_id}
                                        chapterId={data.chapter_id}
                                        lessonId={data.lesson_id}
                                        setShowQuiz={setShowQuiz}
                                    />
                                </>
                            )}
                        </>
                    )}
                    {showMakePayment && (
                        <EnrollmentOpt
                            courseId={parseInt(courseId)}
                            hide={setShowMakePayment}
                            options={options}
                        />
                    )}
                </>
            )}
        </div>
    );
};

const Page: React.FC = () => {
    return (
        <Suspense fallback={<Loader h={'h-[5rem]'} />}>
            <Lecture />
        </Suspense>
    );
};

export default Page;
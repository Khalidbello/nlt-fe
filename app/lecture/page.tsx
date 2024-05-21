'use client';

import Head from '@/components/lecture/head';
import Note from '@/components/lecture/note';
import Audio from '@/components/lecture/audio';
import QuizButton from '@/components/lecture/quiz-bt';
import Quiz from '@/components/lecture/quiz';
import { useEffect, useRef, useState } from 'react';
import Loader from '@/components/multipurpose/loader';
import showClicked from '@/app/utils/clicked';


interface optionsInerface {
    number: number;
    text: string;
};

interface answersInterface {
    [key: number]: number
};

interface questionInterface {
    id: number;
    question: string;
    options: optionsInerface[];
};

interface datainterface {
    audio: string;
    openNote: string;
    quiz: questionInterface[];
    answers: answersInterface
};

const Lecture: React.FC = () => {
    const [data, setData] = useState<datainterface>({
        audio: '',
        openNote: '',
        quiz: [],
        answers: { 0: 100 }
    });
    const [loader, setShowLoader] = useState<boolean>(true);
    const [showQuiz, setShowQuiz] = useState<boolean>(false);

    const startQuiz = () => {
        setTimeout(() => setShowQuiz(true), 250);
    };

    useEffect(() => {
        // simulate data fecting
        setTimeout(() => {
            setShowLoader(false);
            setData(mockdata);
        }, 2000);
    }, []);

    return (
        <div className="w-full h-full pt-20">
            <Head />
            {loader ? (
                <div className='h-[90%] flex items-center justify-center'>
                    <Loader h='h-[8rem]' />
                </div>
            ) : (
                <>
                    <Note text={data.openNote} />
                    <Audio src={data.audio} />
                    <Note text={data.openNote} />
                    <div className='h-10'></div>

                    {!showQuiz && <QuizButton onClick={startQuiz} />}
                    {showQuiz && <Quiz questions={data.quiz} correctAns={data.answers} />}

                    <div className='h-10'></div>
                </>
            )}
        </div >
    );
};


const mockdata: datainterface = {
    audio: '/audio/test.m4a',
    openNote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis blanditiis quas distinctio repellendus earum temporibus adipisci quibusdam tenetur eaque cumque alias ipsa dicta,',
    quiz: [
        {
            id: 1,
            question: 'hello word q22',
            options: [
                { number: 1, text: 'hello' },
                { number: 2, text: 'fine' },
                { number: 3, text: 'cool' },
                { number: 4, text: 'nice' }
            ]
        },
        {
            id: 2,
            question: 'weio eurv',
            options: [
                { number: 1, text: 'hello' },
                { number: 2, text: 'dj' },
                { number: 3, text: 'id' },
                { number: 4, text: 'nskdjfice' }
            ],
        },
        {
            id: 3,
            question: 'okay nice ak v',
            options: [
                { number: 1, text: 'helloosidj' },
                { number: 2, text: 'shdhdfine' },
                { number: 3, text: 'c   ool' },
                { number: 4, text: 'nice uwdfh' }
            ],
        },
        {
            id: 4,
            question: 'okay nice ak v',
            options: [
                { number: 1, text: 'helloosidj' },
                { number: 2, text: 'shdhdfine' },
                { number: 3, text: 'c   ool' },
                { number: 4, text: 'nice uwdfh' }
            ],
        },
    ],
    answers: {
        1: 2,
        2: 4,
        3: 2,
        4: 1
    }
}
export default Lecture;
export type { questionInterface, optionsInerface, answersInterface };
'use client';

import Loader from "@/components/multipurpose/loader";
import { faExclamationCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { error } from "console";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import Question from "./unit-question";

interface QuizViewProps {
    courseId: number;
    chapterId: number;
    lessonId: number;
    reloader: boolean;
};

const QuizView: React.FC<QuizViewProps> = ({ courseId, chapterId, lessonId, reloader }) => {
    const router = useRouter();
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [quiz, setQuiz] = useState<any>([]);
    const [reload, setReload] = useState<boolean>(false);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const fetchQuiz = async () => {
        setError('');
        setIsFetching(true);

        try {
            const response = await fetch(`${apiHost}/admin/quiz/${courseId}/${chapterId}/${lessonId}`, { credentials: 'include' });

            if (response.status === 403) return router.push('/sign-in?redirected=true');
            if (response.status !== 200) throw 'something went wrong';

            const data = await response.json();
            setQuiz(data);
        } catch (err) {
            console.log('an error occured in fetching quizes', err);
            setError('Something went wrong please try again');
        } finally {
            setIsFetching(false);
        };
    };

    useEffect(() => {
        fetchQuiz();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload, reloader]);

    if (isFetching) {
        return (
            <div className="mt-10"> <Loader h='h-[6rem]' /> </div>
        );
    };

    if (error) {
        return (
            <div className="error-container mx-4 bg-red-100 text-red-500 p-4 rounded-lg shadow-md mt-10">
                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                <span className="text-lg">Something went wrong</span>
                <button onClick={() => setReload(!reload)} className="bg-white text-red-500 px-4 py-2 ml-4 rounded-md shadow-md">
                    Reload
                </button>
            </div>
        )
    };

    if (quiz.length < 1 || !quiz) {
        return (
            <div className="flex flex-col items-center gap-6 bg-blue-500 px-5 py-5 mx-6 text-white rounded-md">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 h-10" />
                <p className="text-sm font-medium">{`No queston found. Add question`}</p>
            </div>
        )
    };


    return (
        <div>
            <h2 className="font-medium ml-4 mb-4">Quiz</h2>
            {
                quiz.map((ele: any, index: number) => <Question
                    key={index} data={ele}
                    courseId={courseId}
                    chapterId={chapterId}
                    lessonId={lessonId}
                    setToDeleteData={null}
                    setToEditData={null}
                />)
            }
        </div>
    );
};


export default QuizView;
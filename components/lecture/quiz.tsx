import { useEffect, useRef, useState } from "react";
import Question from "./question"
import showClicked from '@/app/utils/clicked';
import Loader from '@/components/multipurpose/loader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import QuizResult from '@/components/lecture/quiz-result';
import { useRouter } from "next/navigation";

interface QuizProps {
    courseId: number;
    chapterId: number;
    lessonId: number;
    setShowQuiz: React.Dispatch<React.SetStateAction<boolean>>;
};

interface questionType {
    question_id: string;
    question: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: string;
}

const Quiz: React.FC<QuizProps> = ({ courseId, chapterId, lessonId, setShowQuiz }) => {
    const [questions, setQuestions] = useState<questionType[]>([])
    const [answers, setAnswers] = useState<{ [key: number]: boolean }>({ 1: false })
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const [showError, setShowError] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [showResult, setShowResult] = useState<boolean>(false);
    const submitBtRef = useRef<null | HTMLButtonElement>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const router = useRouter();

    const handleSubmit = () => {
        if (submitBtRef.current) showClicked(submitBtRef.current);
        setTimeout(() => setShowResult(true), 250);
    };

    // function to handle  no quiz scnerio
    const handleNoQuiz = async () => {
        console.log('push tonext lesson no quiz');
        const response = await fetch(`${apiHost}/users/quiz-submit/${courseId}/${chapterId}/${lessonId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ percentage: 100 })
        });

        if (response.status === 200) {
            const data = await response.json();
            router.push(`/lecture?courseId=${data.courseId}&chapterId=${data.chapterId}&chapterNumber=${data.chapterNumber}&lessonNumber=${data.lessonNumber}`);
            setTimeout(() => setShowQuiz(false), 250);
        }
    };

    const fetchQUiz = async () => {
        try {
            setShowError(false);
            setShowLoader(true)

            const response = await fetch(`${apiHost}/users/quiz/${courseId}/${chapterId}/${lessonId}`, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.status === 200) {
                const questions = await response.json();
                setQuestions(questions.quiz);
                setShowLoader(false);
                console.log('quiz', questions.quiz, !questions.quiz);

                // set all answers to false 
                for (let i = 0; i < questions.quiz.length; i++) {
                    answers[i + 1] = false;
                };

                // check if quiz is empty just push user to next lesson
                if (questions.quiz.length === 0) handleNoQuiz()
            } else {
                throw 'somthing went wrong';
            }
        } catch (err) {
            setShowError(true)
        } finally {
            setShowLoader(false)
        }
    };

    useEffect(() => {
        fetchQUiz();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload])
    return (
        <>
            {showLoader ? (
                <div> <Loader h='h-[6rem]' /></div>
            ) : (
                <>
                    {showError ? (
                        <div className="error-container mx-4 bg-red-100 text-red-500 p-4 rounded-lg shadow-md mt-8">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                            <span className="text-lg">Something went wrong</span>
                            <button onClick={() => setReload(!reload)} className="bg-white text-red-500 px-4 py-2 ml-4 rounded-md shadow-md">
                                Reload
                            </button>
                        </div>
                    ) : (
                        <div>
                            {questions.map((ele, index) => <Question key={index} question={ele} setAnswers={setAnswers} answers={answers} index={index} />)}

                            <div className='mt-5 text-center'>
                                <button ref={submitBtRef} onClick={handleSubmit} className='bg-blue-500 text-white px-4 py-2 rounded-full '>Submiit</button>
                            </div>

                            {showResult && <QuizResult answers={answers} setShowResult={setShowResult} setShowQuiz={setShowQuiz} courseId={courseId} chapterId={chapterId} lessonId={lessonId} />}
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default Quiz;
export type { questionType }
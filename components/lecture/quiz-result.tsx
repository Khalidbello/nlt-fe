import { faArrowRight, faArrowsToEye, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { faCancel } from "@fortawesome/free-solid-svg-icons/faCancel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import showClicked from '@/app/utils/clicked';
import { faBackward } from "@fortawesome/free-solid-svg-icons/faBackward";
import { useRouter } from "next/navigation";
import Roller from '@/components/multipurpose/roller-white';
import CongratulationsUI from "./course-completion";

interface QuizResultProps {
    answers: { [key: number]: boolean };
    setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
    setShowQuiz: React.Dispatch<React.SetStateAction<boolean>>;
    courseId: number;
    chapterId: number;
    lessonId: number;
};
interface statisticInterface {
    total: number;
    passed: number;
    percentage: number;
}

const QuizResult: React.FC<QuizResultProps> = ({ answers, setShowResult, setShowQuiz, courseId, chapterId, lessonId }) => {
    const router = useRouter();
    const hideBtRef = useRef<HTMLButtonElement | null>(null);
    const [statistics, setStatistics] = useState<statisticInterface>();
    const [showCondition, setShowCondition] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [showRoller, setShowRoller] = useState<boolean>(false);
    const completedBtRef = useRef<null | HTMLButtonElement>(null);
    const retryBtRef = useRef<null | HTMLButtonElement>(null);
    const [showCongrats, setShowCongrats] = useState<boolean>(false);
    const [completionData, setCompletionData] = useState<any>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const keys = Object.keys(answers); //  to hold answer keys

    const hide = () => {
        if (hideBtRef.current) showClicked(hideBtRef.current);
        setTimeout(() => setShowResult(false), 250);
    };

    // function to initiate quiz retry
    const retry = () => {
        if (retryBtRef.current) showClicked(retryBtRef.current);
        hide();
    }
    // function to send request to server to updatee that user just finished the lesson
    const lessonCompleted = async () => {
        if (completedBtRef.current) showClicked(completedBtRef.current);
        // send result to server with course id lessonId and chapter id
        try {
            setShowError(false);
            const response = await fetch(`${apiHost}/users/quiz-submit/${courseId}/${chapterId}/${lessonId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ percentage: statistics?.percentage })
            });

            if (response.status === 200) {
                const data = await response.json();

                if (data.status === 'completed') {
                    // display course completion ui
                    setCompletionData(data);
                    setShowCongrats(true);
                    return;
                };

                router.push(`/lecture?courseId=${data.courseId}&chapterId=${data.chapterId}&chapterNumber=${data.chapterNumber}&lessonNumber=${data.lessonNumber}`);
                setTimeout(() => setShowQuiz(false), 250);
            }
        } catch (err) {
            setShowError(true);
        } finally {
            setShowRoller(false);
        }
    };

    useEffect(() => {
        console.log(answers);
        const total: number = keys.length;
        let passed: number = 0;
        let percentage: number;

        keys.forEach((key: string, index: number) => {
            //@ts-ignore
            if (answers[key]) passed++;
        });

        percentage = passed / total * 100;
        if (percentage < 60) setShowCondition(true);
        setStatistics({ passed, total, percentage: parseInt(percentage.toFixed(2)) });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answers]);

    return (
        <div className="fixed top-0 left-0 px-4 z-50 flex items-center justify-center w-full h-full bg-white">
            <div className="relative overflow-y-auto min-w-[60%] max-h-[80%] bg-blue-50 rounded-xl p-6 pt-9">
                {/* button to hide result */}
                <button
                    ref={hideBtRef}
                    onClick={hide}
                    className="absolute top-2 right-2 flex justify-center items-center h-6 w-6 rounded-full bg-red-100 p-1"
                >
                    <FontAwesomeIcon icon={faX} className="text-red-500 h-4 w-4" />
                </button>

                <h2 className="mb-5 font-semibold">Quiz results</h2>
                {keys.map((key: string, index: number) => {
                    return (
                        <div key={index} className="flex items-center justify-start gap-5 mb-3">
                            <span className="font-semibold">Q{key}</span>
                            {
                                //@ts-ignore
                                <FontAwesomeIcon icon={answers[key] ? faCheck : faX} className={`h-5 w-5 ${answers[key] ? 'text-green-500' : 'text-red-500'}`} />
                            }
                        </div>
                    )
                })}
                <div className="flex justify-start gap-5 flex-wrap mb-8">
                    <span>Score: {statistics?.passed}/{statistics?.total} </span>
                    <span>Percentage: {statistics?.percentage}% </span>
                </div>

                <>
                    {showCondition ? (
                        <div className="text-left">
                            <p className="mb-2">
                                Oops you scored below 60% <b /> try again {`you've`} got this!!!
                            </p>
                            {showError && <p>Something went wrong please try again.</p>}
                            <button
                                ref={retryBtRef}
                                onClick={retry}
                                className="inline-flex items-center justify-center gap-3 bg-blue-500 rounded-full px-5 py-2 text-white">
                                {showRoller ? (
                                    <Roller h='h-[1rem]' />
                                ) : (
                                    <> <FontAwesomeIcon icon={faBackward} className="text-white w-5 h-5" /> Back </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="text-right">
                            <p className="mb-2">
                                You did great!!!. <b />
                                proceed to next lesson to gain more insightfull knowledge.
                            </p>
                            <button
                                ref={completedBtRef}
                                onClick={lessonCompleted}
                                className="inline-flex items-center justify-center gap-3 bg-blue-500 rounded-full px-5 py-2 text-white"
                            >
                                Next <FontAwesomeIcon icon={faArrowRight} className="text-white w-5 h-5" />
                            </button>
                        </div>
                    )}
                </>
            </div>

            {showCongrats && <CongratulationsUI courseName={completionData.courseName} userName={completionData.userName} />}
        </div >
    )
};

export default QuizResult;


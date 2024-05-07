import { faArrowRight, faArrowsToEye, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { faCancel } from "@fortawesome/free-solid-svg-icons/faCancel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { resultInterface } from '@/components/lecture/quiz';
import { useEffect, useRef, useState } from "react";
import showClicked from '@/app/utils/clicked';
import { faBackward } from "@fortawesome/free-solid-svg-icons/faBackward";

interface QuizResultProps {
    result: resultInterface[];
    setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
};
interface statisticInterface {
    total: number;
    passed: number;
    percentage: number;
}

const QuizResult: React.FC<QuizResultProps> = ({ result, setShowResult }) => {
    const hideBtRef = useRef<HTMLButtonElement | null>(null);
    const [statistics, setStatistics] = useState<statisticInterface>();
    const [showCondition, setShowCondition] = useState<boolean>(false);
    const completedBtRef = useRef<null | HTMLButtonElement>(null);
    const retryBtRef = useRef<null | HTMLButtonElement>(null);

    const hide = () => {
        showClicked(hideBtRef);
        setTimeout(() => setShowResult(false), 250);
    };

    // function to initiate quiz retry
    const retry = () => {
        showClicked(retryBtRef);
        hide();
    }
    // function to send request to server to updatee that user just finished the lesson
    const lessonCompleted = () => {
        showClicked(completedBtRef);
        // sedn reques to server
    };

    useEffect(() => {
        const total: number = result.length;
        let passed: number = 0;
        let percentage: number;

        result.forEach((ele) => {
            if (ele.status) passed++;
        });

        percentage = passed / total * 100;
        if (percentage < 60) setShowCondition(true);
        setStatistics({ passed, total, percentage: parseInt(percentage.toFixed(2)) });
    }, [result]);

    return (
        <div className="fixed top-0 left-0 px-4 z-50 flex items-center justify-center w-full h-full bg-white">
            <div className="relative overflow-y-auto min-w-[60%] max-h-[80%] bg-blue-50 rounded-xl p-6 pt-9">
                {/* button to hide result */}
                <button
                    ref={hideBtRef}
                    onClick={hide}
                    className="absolute top-2 right-2 flex justify-center items-center h-6 w-6 rounded-full bg-red-500 p-1"
                >
                    <FontAwesomeIcon icon={faCancel} className="text-white h-4 w-4" />
                </button>

                <h2 className="mb-5 font-semibold">Quiz results</h2>
                {result.map((question, index) => {
                    return (
                        <div key={index} className="flex items-center justify-start gap-5 mb-3">
                            <span className="font-semibold">Q{question.qNum}</span>
                            <FontAwesomeIcon icon={question.status ? faCheck : faX} className={`h-5 w-5 ${question.status ? 'text-green-500' : 'text-red-500'}`} />
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
                                You must earn above 60% to go to next lesson <b /> please kindly retake quiz.
                            </p>
                            <button
                                ref={retryBtRef}
                                onClick={retry}
                                className="inline-flex items-center justify-center gap-3 bg-blue-500 rounded-full px-5 py-2 text-white">
                                <FontAwesomeIcon icon={faBackward} className="text-white w-5 h-5" /> Back
                            </button>
                        </div>
                    ) : (
                        <div className="text-right">
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
        </div >
    )
};

export default QuizResult;


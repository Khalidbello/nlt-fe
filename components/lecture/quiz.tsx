import { useRef, useState } from "react";
import Question from "./question"
import { questionInterface, answersInterface } from '@/app/lecture/page';
import showClicked from '@/app/utils/clicked';
import QuizResult from '@/components/lecture/quiz-result';

interface QuizProps {
    questions: questionInterface[];
    correctAns: answersInterface;
};

interface resultInterface {
    qNum: number;
    status: boolean;
};

const Quiz: React.FC<QuizProps> = ({ questions, correctAns }) => {
    const [answers, setAnswers] = useState<answersInterface>({ 1: 100 });
    const submitBtRef = useRef<null | HTMLButtonElement>(null);
    const [result, setResult] = useState<resultInterface[]>([]);
    const [showResult, setShowResult] = useState<boolean>(false);

    const handleSubmit = () => {
        showClicked(submitBtRef);
        setTimeout(() => {
            const result = checkCorrectAns();
            setResult(result);
            setShowResult(true);
        }, 250);
    };

    const checkCorrectAns = () => {
        const result: resultInterface[] = [];

        questions.forEach((ele, index) => {
            const holder: resultInterface = {
                qNum: 1,
                status: false
            };

            holder.qNum = ele.id;
            holder.status = correctAns[ele.id] === answers[ele.id];
            result.push(holder);
        });
        return result;
    }

    return (
        <div>
            <h3 className="text-center mb-4 font-semibold">QUIZ</h3>
            {questions.map((question, index) => <Question
                key={question.id}
                question={question}
                answers={answers}
                setAnswers={setAnswers}
            />)}

            <div className="text-center mt-5">
                <button
                    ref={submitBtRef}
                    onClick={handleSubmit}
                    className="px-5 py-2 bg-blue-500 text-white rounded-full">
                    Submit
                </button>
            </div>

            {showResult && <QuizResult result={result} setShowResult={setShowResult} />}
        </div>
    )
};


export default Quiz;
export type { resultInterface }
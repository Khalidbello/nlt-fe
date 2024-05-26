import React, { useState } from "react";
import { questionType } from '@/components/lecture/quiz';



interface QuestionProps {
    question: questionType;
    setAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
    answers: { [key: number]: boolean };
    index: number;
};


const Question: React.FC<QuestionProps> = ({ question, setAnswers, answers, index }) => {
    const [selected, setSelected] = useState<null | number>(null);

    const optionSelected = (qNum: number, answer: string) => {

        console.log('answers........', answers);

        setSelected(qNum);
        answers[index + 1] = answer === question.correct_option;
        setAnswers(answers);
        // // Update the state using the callback form of setState
        // setAnswers(prevAnswers => {
        //     // Create a copy of the previous answers object
        //     const newAns = { ...prevAnswers };
        //     console.log(newAns);

        //     // Update the answer for the current question ID
        //     newAns[qID] = answer;

        //     // Log the new answers object
        //     console.log(newAns);

        //     // Return the updated answers object
        //     return newAns; });
    };


    return (
        <div className="bg-blue-50 rounded-xl p-4 mb-3 mx-3">
            <p className="mb-3"><span className="font-medium mr-2">Q{index + 1}.</span> {question.question}</p>
            <div >
                <form key={index + 1} className="pl-4" >
                    <label className="block">
                        <input
                            type="radio"
                            name={`q${question.option_a}`}
                            value={index}
                            onChange={() => optionSelected(1, question.option_a)}
                            checked={1 === selected}
                            className="mr-2"
                        />
                        {question.option_a}
                    </label>

                    <label className="block">
                        <input
                            type="radio"
                            name={`q${question.option_b}`}
                            value={index}
                            onChange={() => optionSelected(2, question.option_b)}
                            checked={2 === selected}
                            className="mr-2"
                        />
                        {question.option_b}
                    </label>

                    <label className="block">
                        <input
                            type="radio"
                            name={`q${question.option_c}`}
                            value={index}
                            onChange={() => optionSelected(3, question.option_c)}
                            checked={3 === selected}
                            className="mr-2"
                        />
                        {question.option_c}
                    </label>

                    <label className="block">
                        <input
                            type="radio"
                            name={`q${question.option_d}`}
                            value={index}
                            onChange={() => optionSelected(4, question.option_d)}
                            checked={4 === selected}
                            className="mr-2"
                        />
                        {question.option_d}
                    </label>
                </form>
            </div>
        </div>
    )
};

export default Question;
import React, { useState } from "react";
import { questionInterface, answersInterface } from '@/app/lecture/page';



interface QuestionProps {
    question: questionInterface;
    setAnswers: React.Dispatch<React.SetStateAction<answersInterface>>;
    answers: answersInterface
};


const Question: React.FC<QuestionProps> = ({ question, answers, setAnswers }) => {
    const [selected, setSelected] = useState<null | number>(null);

    const optionSelected = (answer: number, qID: number) => {
        // Update the state using the callback form of setState
        setAnswers(prevAnswers => {
            // Create a copy of the previous answers object
            const newAns = { ...prevAnswers };
            console.log(newAns);

            // Update the answer for the current question ID
            newAns[qID] = answer;

            // Log the new answers object
            console.log(newAns);

            // Return the updated answers object
            return newAns;
        });
    };


    return (
        <div className="bg-blue-50 rounded-xl p-4 mb-3 mx-3">
            <p className="mb-3"><span className="font-medium mr-2">Q{question.id}.</span> {question.question}</p>
            <div >
                {question.options.map((option, index) => {
                    return <form key={index} className="pl-4" >
                        <label className="block">
                            <input
                                type="radio"
                                name={`q${option.text}`}
                                value={index}
                                onChange={() => { setSelected(index + 1); optionSelected(option.number, question.id) }}
                                checked={index + 1 === selected}
                                className="mr-2"
                            />
                            {option.text}
                        </label>
                    </form>
                })}
            </div>
        </div>
    )
};

export default Question;
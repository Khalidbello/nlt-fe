import { faDeleteLeft, faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"

interface QuestionProps {
    data: any;
    courseId: number;
    chapterId: number;
    lessonId: number;
    setToDeleteData: any; // React.Dispatch<React.SetStateAction<boolean>>;
    setToEditData: any; //React.Dispatch<React.SetStateAction<boolean>>;
};

const Question: React.FC<QuestionProps> = ({ data, courseId, chapterId, lessonId, setToDeleteData, setToEditData }) => {

    return (
        <div className="shadow-md p-2 mx-2 rounded-xl mb-4">
            <div className="text-right mb-2">
                <button className="w-10 h-10 rounded bg-blue-100 mr-6">
                    <FontAwesomeIcon icon={faEdit} className="w-6 h-6 text-blue-500" />
                </button>
                <button className="w-10 h-10 rounded bg-red-100">
                    <FontAwesomeIcon icon={faDeleteLeft} className="w-6 h-6 text-red-500" />
                </button>
            </div>

            <p>{data.question}</p>
            <p>1. {data.option_a}</p>
            <p>2. {data.option_b}</p>
            <p>3. {data.option_c}</p>
            <p>4. {data.option_d}</p>
            <p>Answer: {data.answer}</p>
        </div>
    );
};


export default Question;
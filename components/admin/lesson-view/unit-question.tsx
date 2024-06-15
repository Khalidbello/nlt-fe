import { faDeleteLeft, faEdit } from "@fortawesome/free-solid-svg-icons"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useRef, useState } from "react"
import { quizType } from "./quiz-view";
import showClicked from "@/app/utils/clicked";

interface QuestionProps {
    data: quizType;
    courseId: number;
    chapterId: number;
    lessonId: number;
    setActionData: React.Dispatch<React.SetStateAction<quizType | null>>;
    showEdit: React.Dispatch<React.SetStateAction<boolean>>;
    showDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

const Question: React.FC<QuestionProps> = ({ data, courseId, chapterId, lessonId, setActionData, showEdit, showDelete }) => {
    const editBtRef = useRef<HTMLButtonElement | null>(null);
    const deleteBtRef = useRef<HTMLButtonElement | null>(null);

    const editClicked = () => {
        if (editBtRef.current) showClicked(editBtRef.current);
        setActionData(data);
        setTimeout(() => showEdit(true), 250);
    };

    return (
        <div className="shadow-lg p-2 mx-2 rounded-xl mb-4 border-[2px] border-gray-200">
            <div className="text-right mb-2">
                <button ref={editBtRef} onClick={editClicked} className="w-10 h-10 bg-blue-100 mr-6 rounded-lg">
                    <FontAwesomeIcon icon={faEdit} className="w-5 h-5 text-blue-500" />
                </button>
                <button className="w-10 h-10 bg-red-100 rounded-lg">
                    <FontAwesomeIcon icon={faTrashCan} className="w-5 h-5 text-red-500" />
                </button>
            </div>

            <p>{data.question}</p>
            <p>1. {data.option_a}</p>
            <p>2. {data.option_b}</p>
            <p>3. {data.option_c}</p>
            <p>4. {data.option_d}</p>
            <p>Answer: {data.correct_option}</p>
        </div>
    );
};


export default Question;
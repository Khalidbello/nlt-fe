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

    const deleteClicked = () => {
        if (deleteBtRef.current) showClicked(deleteBtRef.current);
        setActionData(data);
        setTimeout(() => showDelete(true), 250);
    };

    return (
        <div className="shadow-lg p-2 mx-2 rounded-xl mb-4 border-[2px] border-gray-200">
            <div className="text-right mb-2">
                <button ref={editBtRef} onClick={editClicked} className="w-8 h-8 bg-blue-100 mr-6 rounded-xl">
                    <FontAwesomeIcon icon={faEdit} className="w-4 h-4 text-blue-500" />
                </button>
                <button ref={deleteBtRef} onClick={deleteClicked} className="w-8 h-8 bg-red-100 rounded-xl">
                    <FontAwesomeIcon icon={faTrashCan} className="w-4 h-4 text-red-500" />
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
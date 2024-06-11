import React, { useRef } from 'react';
import showClicked from '@/app/utils/clicked';

interface QuizButtonProps {
    onClick: () => void;
}

const QuizButton: React.FC<QuizButtonProps> = ({ onClick }) => {
    const quizBtRef = useRef<null | HTMLButtonElement>(null);

    return (
        <div className='text-center mt-10'>
            <button
                onClick={() => {
                    if (quizBtRef.current) showClicked(quizBtRef.current)
                    onClick()
                }}
                ref={quizBtRef}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out"
            >
                Take Quiz
            </button>
        </div>

    );
};

export default QuizButton;

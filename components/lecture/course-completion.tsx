import showClicked from '@/app/utils/clicked';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

interface courseName {
    courseName: string;
    userName: string;
    courseId: number;
}

const CongratulationsUI: React.FC<courseName> = ({ courseName, userName, courseId }) => {
    const router = useRouter();
    const btRef = useRef<HTMLButtonElement | null>(null);

    const handleBtClick = () => {
        if (btRef.current) showClicked(btRef.current);
        setTimeout(() => router.push(`/course-view?course_id=${courseId}`), 250);
    }
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-blue-600 flex items-center justify-center z-50 px-5'>
            <div className="bg-gray-100 shadow-md rounded-lg p-10 flex flex-col items-center">
                <h1 className="text-xl font-bold text-blue-600 mb-6">Congratulations! {userName}</h1>
                <p className="text-xl text-gray-700 text-center mb-8">
                    {`You've successfully completed the "${courseName}" course.`}
                </p>
                <div className="flex flex-col justify-center items-center rounded-xl">
                    <FontAwesomeIcon icon={faTrophy} className='text-green-500' />
                    <div className="text-xl font-medium mb-4">Well Done!</div>
                    <button onClick={handleBtClick} ref={btRef} className='bg-blue-500 text-white px-5 py-2 rounded-full'>Ok</button>
                </div>
            </div>
        </div>
    );
};

export default CongratulationsUI;

import React from 'react';

interface courseName {
    courseName: string;
    userName: string;
}

const CongratulationsUI: React.FC<courseName> = ({ courseName, userName }) => {
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-blue-600 flex items-center justify-center'>
            <div className="bg-gray-100 shadow-md rounded-lg p-10 flex flex-col items-center">
                <h1 className="text-4xl font-bold text-blue-600 mb-6">Congratulations! {userName}</h1>
                <p className="text-xl text-gray-700 text-center mb-8">
                    {`You've successfully completed the "${courseName}" course.`}
                </p>
                <div className="flex justify-center items-center">
                    <i className="fas fa-trophy text-yellow-500 text-4xl mb-4"></i>
                    <span className="text-xl font-bold">Well Done!</span>
                </div>
            </div>
        </div>
    );
};

export default CongratulationsUI;

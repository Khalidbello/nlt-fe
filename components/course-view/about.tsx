'use client';

import React, { useState } from 'react';

interface AboutProps {
    text: string,
    limit: number,
};

const About: React.FC<AboutProps> = ({ text, limit }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const displayedText = isExpanded ? text : `${text.substring(0, limit)}...`;

    const handleToggleExpansion = () => setIsExpanded(!isExpanded);

    return (
        <div className="mb-4 mx-3">
            <h2 className='font-medium pl-6 mb-2'>About course</h2>
            <p className="text-gray-700 border-[2px] border-blue-50 shadow-md rounded-xl p-3">{displayedText}</p>
            {!isExpanded && (
                <div className='text-center'>
                    <button className="text-blue-500 text-sm hover:underline" onClick={handleToggleExpansion}>
                        See more
                    </button>
                </div>
            )}
            {isExpanded && (
                <div className='text-center'>
                    <button className="text-blue-500 text-sm hover:underline" onClick={handleToggleExpansion}>
                        See Less
                    </button>
                </div>
            )}
        </div>
    );
}

export default About;

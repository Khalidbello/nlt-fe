import { faHand, faHandshake, faMessage, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Welcome: React.FC = () => {
    return (
        <div className="bg-blue-50 text-gray-700 p-8 mt-2 mx-4 rounded-lg shadow-md flex gap-2 items-start justify-between">
            <FontAwesomeIcon icon={faHandshake} className="text-blue-500 w-8 h-8" />
            <div className="text-left">
                <h2 className="text-xl font-semibold">Welcome to Platform!</h2>
                <p className="mt-2">Enjoy your learning journey with NLP courses.</p>
            </div>
        </div>

    );
};

export default Welcome;

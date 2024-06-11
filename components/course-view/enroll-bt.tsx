'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import showClick from '@/app/utils/clicked';
import EnrollmentOpt from './enrollment-option';

const FloatingEnrollButton: React.FC<{ courseId: number }> = ({ courseId }) => {
    const [showEnrollOpt, setShowEnrollOpt] = useState<boolean>(false);
    const btRef = useRef<null | HTMLButtonElement>(null);

    const handleClick = () => {
        if (btRef.current) showClick(btRef.current);
        setTimeout(() => setShowEnrollOpt(true), 250);
    };

    return (
        <>
            <div className="fixed bottom-4 right-4">
                <button
                    disabled={showEnrollOpt}
                    onClick={handleClick}
                    ref={btRef}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg flex items-center justify-center"
                >
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    Enroll Now
                </button>
            </div>
            {showEnrollOpt && <EnrollmentOpt courseId={courseId} hide={setShowEnrollOpt} options={3} />}
        </>
    );
}

export default FloatingEnrollButton;

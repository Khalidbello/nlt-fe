import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import showClicked from '@/app/utils/clicked';
import { useRef } from 'react';

interface continueLearningBTProps {
    courseId: number;
    chapterId: number;
    chapterNUmber: number;
    lessonNumber: number;
}
const ContinueLearningBT: React.FC<continueLearningBTProps> = ({ courseId, chapterId, chapterNUmber, lessonNumber }) => {
    const router = useRouter();
    const btRef = useRef<null | HTMLButtonElement>(null)

    const handleClick = () => {
        if (btRef.current) showClicked(btRef.current);
        setTimeout(() => {
            router.push(`/lecture?courseId=${courseId}&chapterId=${chapterId}&chapterNumber=${chapterNUmber}&lessonNumber=${lessonNumber}`);
        }, 250);
    };

    return (
        <div className="fixed bottom-4 right-4">
            <button
                ref={btRef}
                onClick={handleClick}
                className="bg-blue-500 text-white font-medium py-2 px-4 rounded-full shadow-lg flex items-center justify-center gap-2"
            >
                Continue
                <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
            </button>
        </div>
    );
}

export default ContinueLearningBT;

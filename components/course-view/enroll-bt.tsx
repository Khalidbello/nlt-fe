import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

function FloatingEnrollButton() {
    return (
        <div className="fixed bottom-4 right-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                Enroll Now
            </button>
        </div>
    );
}

export default FloatingEnrollButton;

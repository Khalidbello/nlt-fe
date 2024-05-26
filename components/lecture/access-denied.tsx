import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

interface NoAccessProps {
    message?: string; // Optional custom message
}

const NoAccess: React.FC<NoAccessProps> = ({ message = 'You cannot access this content.' }) => {
    return (
        <div
            className='bg-gray-200 text-gray-700 px-4 py-3 rounded-md font-medium flex items-center justify-center'>
            <FontAwesomeIcon icon={faLock} className="mr-2 text-gray-400" />
            {message}
        </div>
    );
};

export default NoAccess;

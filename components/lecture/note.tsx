import { faNotdef, faNoteSticky, faStickyNote } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface NoteProps {
    text: string;
}
const Note: React.FC<NoteProps> = ({ text }) => {
    return (
        <div className="p-3 rounded-xl bg-blue-50 text-gray-700 mb-4 mx-4">
            <FontAwesomeIcon icon={faStickyNote} className="w-5 h-5 text-blue-500" />
            <p>{text}</p>
        </div>
    )
};

export default Note;
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ProfilePicProps {
    firstName: string;
    lastName: string;
}

const ProfilePic: React.FC<ProfilePicProps> = ({ firstName, lastName }) => {
    return (
        <div className="flex gap-5 pt-20 pl-2 gap-x-5">
            <div className="flex flex-col gap-3 pl-3">
                <div className="w-40 h-40 rounded-full bg-blue-50 flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} className="h-24 w-24" />
                </div>
                <div className="flex text-3xl font-bold">
                    <span className="pr-4">{firstName}</span>
                    <span className="opacity-40">{lastName}</span>
                </div>
            </div>
            <div className="flex flex-col pt-10">
                <span>Joined</span>
                <span className="font-semibold">20-11-2023</span>
            </div>
        </div>
    )
}

export default ProfilePic
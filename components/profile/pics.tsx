import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SelectImageForm from "./select-image-form";
import showClicked from "@/app/utils/clicked";

interface ProfilePicProps {
    firstName: string;
    lastName: string;
}

const ProfilePic: React.FC<ProfilePicProps> = ({ firstName, lastName }) => {
    const [reload, setReload] = useState<boolean>(false);
    const [dp, setDp] = useState<any>(null);
    const [showEditImage, setShowEditImage] = useState<boolean>(false);
    const showImageBtRef = useRef<HTMLButtonElement | null>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const handleShowImage = () => {
        if (showImageBtRef.current) showClicked(showImageBtRef.current);
        setTimeout(() => setShowEditImage(true), 250);
    };

    const fetchUserImage = async () => {
        try {
            const response = await fetch(`${apiHost}/users/user-dp`, {
                credentials: 'include',
            });

            if (response.status !== 200) throw 'somthing went wrong';
            const data = await response.json();

            console.log('in user dp', data);
            setDp(data.dp);
        } catch (err) {
            console.log(err);
        };
    };

    useEffect(() => {
        fetchUserImage();
    }, [reload]);

    return (
        <div className="flex gap-5 pt-20 pl-2 gap-x-5 relative">
            <div className="flex flex-col gap-3 pl-3">
                <div className="relative w-40 h-40 rounded-full bg-blue-50 flex items-center justify-center">
                    {dp ? (
                        <Image alt='profile picture' height={500} width={500} src={`data:image/jpeg;base64,${dp}`} className="h-full w-full rounded-full" />
                    ) : (
                        <FontAwesomeIcon icon={faUser} className="h-24 w-24" />
                    )}
                    <button
                        ref={showImageBtRef}
                        onClick={handleShowImage}
                        className="flex items-center justify-center absolute bottom-0 right-7 bg-blue-500 w-9 h-9 rounded-full"
                    >
                        <FontAwesomeIcon icon={faPlus} className="text-white w-5 h-5" />
                    </button>
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
            {showEditImage && <SelectImageForm show={setShowEditImage} reload={reload} setReload={setReload} />}
        </div>
    )
}

export default ProfilePic
'use client';

import Header from "@/components/multipurpose/header"
import Loader from "@/components/multipurpose/loader";
import ProfilePic from "@/components/profile/pics";
import UserInfo from "@/components/profile/user-info";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface userInfoType {
    user_id: number;
    email: string;
    first_name: string;
    last_name: string;
    joined: string;
    phone_number: string;
    password: string;
    gender: string;
    recent_course_id: number;
    recent_course_date: string;
}

const Profile: React.FC = () => {
    const router = useRouter();
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const [showError, setShowError] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<userInfoType>({
        user_id: 0,
        email: '',
        first_name: '',
        last_name: '',
        joined: '',
        phone_number: '',
        password: '',
        gender: '',
        recent_course_id: 0,
        recent_course_date: '',
    });
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const fetchInfo = async () => {
        try {
            setShowLoader(true);
            const response = await fetch(`${apiHost}/users/profile`, { credentials: 'include' });

            if (response.status === 200) {
                const data = await response.json();

                setUserInfo(data);
            } else if (response.status === 403) {
                router.push('/sign-in?redirect=true');
            } else {
                throw 'something went wrong';
            };
        } catch (err) {
            setShowError(true)
        } finally {
            setShowLoader(false);
        }
    }

    useEffect(() => {
        fetchInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="w-full h-full">
            <Header heading="Profile" />
            {showLoader ? (
                <div className="w-full h-[80%] flex justify-center items-center">
                    <Loader h='h-[6rem]' />
                </div>
            ) : (showError ? (
                <div className="error-container mx-4 bg-red-100 text-red-500 p-4 rounded-lg shadow-md mt-20">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                    <span className="text-lg">Something went wrong</span>
                    <button onClick={() => setReload(!reload)} className="bg-white text-red-500 px-4 py-2 ml-4 rounded-md shadow-md">
                        Reload
                    </button>
                </div>

            ) : (
                <>
                    <ProfilePic firstName={userInfo.first_name} lastName={userInfo.last_name} />
                    <UserInfo email={userInfo.email} phoneNumber={userInfo.phone_number} gender={userInfo.gender} />
                </>
            )
            )}
            <div className="h-20"></div>
        </div >
    )
}

export default Profile;
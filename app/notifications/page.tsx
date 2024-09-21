'use client';

import Notification from "@/components/admin/notification/unit-notification";
import Header from "@/components/multipurpose/header";
import HomeBt from "@/components/multipurpose/home-bt";
import Loader from "@/components/multipurpose/loader";
import { faExclamationCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Notifications = () => {
    const [notifications, setNotifications] = useState<[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [fetchingMore, setFetchingMore] = useState<boolean>(false);
    const [showMoreBt, setShowMoreBt] = useState<boolean>(true);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [reload, setReload] = useState<boolean>(false);
    const [pagin, setPagin] = useState<number>(0);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    // haandle seee more clicked 
    const handleSeeMore = () => {
        setFetchingMore(true);
        setPagin(pagin + 5);
    };


    const fetchNotifications = async () => {
        try {
            const response = await fetch(`${apiHost}/users/notifications/10/${pagin}`, { credentials: 'include' });

            if (response.status !== 200) throw 'something went wrong fetching notifications';

            const data: [] = await response.json();
            if (data.length < 10) setShowMoreBt(false);

            setNotifications([...notifications, ...data]);
        } catch (err) {
            console.log('error occured in notifications', err);
            setError(true);
        } finally {
            setIsFetching(false);
            setFetchingMore(false);
        };
    };

    useEffect(() => {
        fetchNotifications();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload, pagin]);

    if (isFetching) {
        return (
            <div className="relativew-full h-full">
                <Header heading="Notifications" />
                <div className="flex justify-center items-center h-[80%]">
                    <Loader h='h-[7rem]' />
                </div>
            </div>
        );
    };

    if (error) {
        return (
            <div className="relativew-full h-full mt-36">
                <Header heading="Notifications" />
                <div className="error-container mx-4 bg-red-100 text-red-500 p-4 rounded-lg shadow-md mt-8">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                    <span className="text-lg">Something went wrong</span>
                    <button onClick={() => { setReload(!reload); setPagin(0) }} className="bg-white text-red-500 px-4 py-2 ml-4 rounded-md shadow-md">
                        Reload
                    </button>
                </div>
            </div>
        );
    };

    if (notifications.length < 1) {
        return (
            <div className="relativew-full h-full mt-20">
                <Header heading="Notifications" />
                <div className="flex flex-col items-center gap-6 bg-blue-500 px-5 py-5 mt-20 mx-6 text-white rounded-md">
                    <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 h-10" />
                    <p className="text-sm font-medium">You do not have any notification yet.</p>
                </div>
            </div>
        );
    };

    return (
        <div className="relativew-full h-full mt-20">
            <HomeBt />
            <Header heading="Notifications" />

            {notifications.map((ele: any, index: number) => {
                return <Notification key={index} type={ele.type} message={ele.message} viewed={ele.viewed} date={ele.created_at} />
            })}

            {showMoreBt && (<div className="text-center mt-4 mb-3">
                {fetchingMore ? (
                    <Loader h="h-[1rem]" />
                ) : (
                    <button onClick={handleSeeMore} className="text-sm text-blue-500">See more</button>
                )}
            </div>)}
        </div>
    );
};

export default Notifications;

const data: any = [
    {
        type: "success",
        message: 'you succesfully nrolled for how to become a demond slayer',
        viewed: true,
        date: '11-02-2020'
    },
    {
        type: "info",
        message: 'you succesfully nrolled for how to become a demond slayer',
        viewed: false,
        date: '11-02-2020'
    },
    {
        type: "error",
        message: 'you succesfully nrolled for how to become a demond slayer',
        viewed: false,
        date: '11-02-2020'
    }
]
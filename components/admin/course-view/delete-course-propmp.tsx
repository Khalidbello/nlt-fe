'use client';

import showClicked from "@/app/utils/clicked";
import RollerAnimation from "@/components/multipurpose/roller-white";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react"

interface DeletePromptProps {
    show: React.Dispatch<React.SetStateAction<boolean>>;
    courseId: number;
};

const DeletePrompt: React.FC<DeletePromptProps> = ({ show, courseId }) => {
    const router = useRouter();
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const yesBtRef = useRef<HTMLButtonElement | null>(null);
    const noBtRef = useRef<HTMLButtonElement | null>(null);
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [otp, setOtp] = useState<string>('');
    const [enterOtp, setEnterOtp] = useState<string>('');
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const requestDeleteOtp = async () => {
        setIsDeleting(true);

        try {
            const response = await fetch(`${apiHost}/admin/request-course-del-otp`, { credentials: 'include' });

            //if (response.status !== 200) throw 'something went wrong.';

            setOtpSent(true);
        } catch (err) {
            console.log('Error requesting confirmation otp. try again');
            setError(true);
            setTimeout(() => show(false), 2000);
        } finally {
            setIsDeleting(false);
        };
    };

    const handledelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (otp.length > 4) return setEnterOtp('Otp has to be atleat 4 number in lenght.');
        setIsDeleting(true);

        try {
            const response = await fetch(`${apiHost}/admin/delete-course/${courseId}/${otp}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.status !== 200) throw 'something went wrong';
            setSuccess(true);
            setTimeout(() => router.push('/admin'));
        } catch (err) {
            console.log('an error ocured in dekte quiz', err);
            setError(true);
            setTimeout(() => show(false), 2000);
        } finally {
            setIsDeleting(false);
        };
    };

    const handleCancle = () => {
        if (noBtRef.current) showClicked(noBtRef.current);
        setTimeout(() => show(false), 250);
    };

    if (error) {
        return (
            <div className="fixed top-0 right-0 w-full h-full bg-blue-600 bg-opacity-90 flex items-center justify-center z-50">
                <p className="bg-white rounded-xl p-4 mx-4 text-red-600 text-center">
                    An error occured please try again
                </p>
            </div>
        );
    };

    if (success) {
        return (
            <div className="fixed top-0 right-0 w-full h-full bg-blue-600 bg-opacity-90 flex items-center justify-center z-50">
                <p className="bg-white rounded-xl p-4 mx-4 text-green-600 text-center">
                    Question deleted successfully
                </p>
            </div>
        );
    };

    if (otpSent) {
        return (
            <div className="fixed top-0 right-0 w-full h-full bg-blue-600 bg-opacity-90 flex items-center justify-center z-50 p-6">
                <div className="bg-white rounded-xl p-4 pt-12 relative">
                    <button ref={noBtRef}
                        onClick={handleCancle}
                        className="flex items-center justify-center bg-red-100 w-8 h-8 rounded-full absolute top-3 right-3"
                    >
                        <FontAwesomeIcon icon={faX} className="w-4 h-4 text-red-500" />
                    </button>

                    <form onSubmit={handledelete} className="w-full">
                        <label htmlFor="">Enter otp sent to your email </label>
                        <input
                            type="text"
                            className="p-2 rounded-full border-[1px] border-gray-200 w-full"
                            onChange={(e) => { setOtp(e.target.value); setEnterOtp(''); }}
                        />

                        {enterOtp && <p className="text-center text-red-500 text-sm my-3">{enterOtp}</p>}

                        <div className="text-right mt-4">
                            <button className="text-white bg-red-500 px-4 py-2 rounded-full">
                                {isDeleting ? <RollerAnimation h='h-[1.5rem]' /> : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed top-0 right-0 w-full h-full bg-blue-600 bg-opacity-90 flex items-center justify-center z-50">
            <p className="bg-white rounded-xl p-4 mx-4">
                <p className="">
                    Are you sure you want to delete this course ? <b />
                    this action is destructive and cannot be  undone
                </p>
                <div className="text-right mt-5">
                    <button
                        ref={yesBtRef}
                        onClick={requestDeleteOtp}
                        className="text-red-500 bg-red-100 px-5 py-2 rounded-full mr-6"
                    >
                        {isDeleting ? <RollerAnimation h='h-[1.5rem]' /> : 'Yes'}
                    </button>
                    <button
                        ref={noBtRef}
                        onClick={handleCancle}
                        className="text-blue-600 bg-blue-100 px-5 py-2 rounded-full"
                    >
                        No
                    </button>
                </div>
            </p>
        </div >
    )
};


export default DeletePrompt;
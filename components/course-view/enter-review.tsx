import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useRef, useState } from "react";
import RollerAnimation from "../multipurpose/roller-white";
import showClicked from "@/app/utils/clicked";

interface EnterReviewProps {
    courseName: string;
    courseId: number;
    hide: React.Dispatch<React.SetStateAction<boolean>>;
};

const EnterReview: React.FC<EnterReviewProps> = ({ courseName, courseId, hide }) => {
    const [review, setReview] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [reviewed, setReviewed] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const hideBtRef = useRef<null | HTMLButtonElement>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const hideReview = () => {
        if (hideBtRef.current) showClicked(hideBtRef.current);
        setTimeout(() => hide(false), 230);
    };

    const handleInputReview = (value: string) => {
        setError('');
        setReview(value);
    };

    const submitReview = async () => {
        if (!review) return setError('Review submission can not be empty');
        setSubmitting(true);

        try {
            const response = await fetch(`${apiHost}/users/review-submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    courseId: courseId,
                    courseName: courseName,
                    review: review
                })
            });

            if (response.status !== 200) throw 'An error ocured please try again';

            setReviewed(true);
            setTimeout(() => hide(false), 1000);
        } catch (err) {
            console.log('AN error occured in submit review', err);
            setError('An error occured');
        } finally {
            setSubmitting(false);
        };
    };

    if (reviewed) {
        return (
            <div className="fixed top-0 right-0 p-4 bg-blue-800 bg-opacity-80 w-full h-full flex items-center justify-center z-50">
                <p className="bg-white relative rounded-xl p-3 text-green-700 text-center text-sm">
                    Review submitted sucessfully
                </p>
            </div>
        )
    }
    return (
        <div className="fixed top-0 right-0 p-4 bg-blue-800 bg-opacity-80 w-full h-full flex items-center justify-center z-50">
            <div className="bg-white relative rounded-xl p-3">
                <button ref={hideBtRef} onClick={hideReview} className="w-6 h-6 rounded-full absolute top-2 right-2 bg-red-100 flex items-center justify-center">
                    <FontAwesomeIcon icon={faX} className="text-red-500 w-3 h-3" />
                </button>
                <p className="mt-8 mb-3">Kindly enter your review for {courseName}</p>
                <form onSubmit={(e) => e.preventDefault()}>
                    <textarea
                        onChange={(e) => handleInputReview(e.target.value)}
                        className="border-2 border-gray-100 rounded-xl px-3 py-2 w-full h-20"
                        placeholder="Review" ></textarea>
                    {error && < p className="text-sm text-red-500 text-center">{error}</p>}
                    <div className="text-right mt-4">
                        <button
                            onClick={submitReview}
                            className="bg-blue-600 text-white text-center rounded-full px-4 py-2"
                        >{!submitting ? (
                            'Submit') : (
                            <RollerAnimation h="h-[1.5rem]" />
                        )}</button>
                    </div>
                </form>
            </div>
        </div >
    );
};


export default EnterReview;
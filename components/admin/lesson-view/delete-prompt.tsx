import showClicked from "@/app/utils/clicked";
import RollerAnimation from "@/components/multipurpose/roller-white";
import React, { useRef, useState } from "react"

interface DeletePromptProps {
    show: React.Dispatch<React.SetStateAction<boolean>>;
    questionId: number;
    reloader: boolean;
    setReloader: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeletePrompt: React.FC<DeletePromptProps> = ({ show, questionId, reloader, setReloader }) => {
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const yesBtRef = useRef<HTMLButtonElement | null>(null);
    const noBtRef = useRef<HTMLButtonElement | null>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const handledelete = async () => {
        setIsDeleting(true);

        try {
            const response = await fetch(`${apiHost}/admin/delete-quiz/${questionId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.status !== 200) throw 'something went wrong';
            setSuccess(true);
        } catch (err) {
            console.log('an error ocured in dekte quiz', err);
            setError(true);
        } finally {
            setTimeout(() => {
                setReloader(!reloader);
                show(false)
            }, 2000);
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

    return (
        <div className="fixed top-0 right-0 w-full h-full bg-blue-600 bg-opacity-90 flex items-center justify-center z-50">
            <p className="bg-white rounded-xl p-4 mx-4">
                Are you sure you want to delete question ? <b />
                this cannot be undone

                <div className="text-right mt-5">
                    <button
                        ref={yesBtRef}
                        onClick={handledelete}
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
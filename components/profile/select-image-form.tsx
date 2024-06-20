'use client';

import showClicked from "@/app/utils/clicked";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import RollerAnimation from "../multipurpose/roller-white";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SelectImageFormProps {
    show: React.Dispatch<React.SetStateAction<boolean>>;
    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
};

const SelectImageForm: React.FC<SelectImageFormProps> = ({ show, reload, setReload }) => {
    const router = useRouter();
    const [image, setImage] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const hideBtRef = useRef<HTMLButtonElement | null>(null);
    const [error, setError] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    let apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const inputChanged = (data: React.ChangeEvent<HTMLInputElement>) => {
        const file = data.target.files?.[0];

        if (!file) return setError('Select a valid image');

        const url = URL.createObjectURL(file);
        setImageUrl(url);
        setImage(file);
        setError('');
    };

    const hide = () => {
        if (hideBtRef.current) showClicked(hideBtRef.current);
        setTimeout(() => show(false), 250);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!image) return setError('Select a valid image');

        const formData = new FormData();
        formData.append('dp', image);
        setSubmitting(true);

        try {
            const response = await fetch(`${apiHost}/users/edit-dp`, {
                credentials: 'include',
                method: 'POST',
                body: formData
            });

            if (response.status === 403) return router.push('/sign-in?redirected=true')
            if (response.status !== 200) throw 'something went wrong';

            setSuccess(true);
            setReload(!reload);
            setTimeout(() => show(false), 2000);
        } catch (err) {
            console.log('an error occured uploading profile picture', err);
            setError('Something went wrong. Please try again.')
        } finally {
            setSubmitting(false);
        };
    };

    if (success) {
        return (
            <div className="fixed top-0 right-0 w-full h-full flex justify-center items-center bg-blue-600 bg-opacity-90 px-10">
                <div className="p-4 bg-white text-center text-green-600 text-sm rounded-xl">
                    profile picture uploded successfully
                </div>
            </div>
        );
    };

    return (
        <div className="fixed top-0 right-0 w-full h-full flex justify-center items-center bg-blue-600 bg-opacity-90">
            <div className="bg-white p-4 rounded-xl relative mx-20">
                <button
                    ref={hideBtRef}
                    onClick={hide}
                    className="bg-red-100 h-8 w-8 rounded-full absolute top-3 right-3">
                    <FontAwesomeIcon icon={faX} className="w-4 h-4 text-red-500" />
                </button>

                <h2 className="font-medium">Select image</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mx-auto h-40 w-40 rounded-full bg-gray-100 flex items-center justify-center">
                        {imageUrl ? (
                            <Image alt="dp" height={500} width={500} src={imageUrl} className="h-36 w-36 rounded-full" />
                        ) : (
                            <label htmlFor="image"> <FontAwesomeIcon icon={faPlus} className="text-gray-400 w-24 h-24" /> </label>
                        )}
                    </div>
                    <input name='imaeg' type="file" accept="image/*" onChange={inputChanged} />

                    {error && <p className="text-red-500 text-sm text-center mt-4"> {error}</p>}

                    <div className="text-right mt-8">
                        <button
                            disabled={submitting}
                            className="bg-blue-500 text-white px-4 py-2 rounded-full"
                        >
                            {submitting ? (
                                <RollerAnimation h="h-[1.5rem]" />
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SelectImageForm;
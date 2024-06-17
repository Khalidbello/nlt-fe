'use client';

import showClicked from "@/app/utils/clicked";
import RollerAnimation from "@/components/multipurpose/roller-white";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useRef, useState } from "react";

interface AddChapterProps {
    show: React.Dispatch<React.SetStateAction<boolean>>;
    courseId: number;
    data: null | {
        chapterId: number;
        chapterTitle: string;
        chapterNumber: number;
        numOfLessons: Number;
        courseName: string;
    };
}

const AddChapter: React.FC<AddChapterProps> = ({ show, courseId, data }) => {
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [chapterTitle, setchapterTitle] = useState<string>('');
    const [chapterNum, setChapterNum] = useState<number>(0);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const hideBtRef = useRef<HTMLButtonElement | null>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const [url, setUrl] = useState<string>(`${apiHost}/admin/create-chapter/${courseId}`);

    // function to configure for edit chapter
    const configure = () => {
        if (!data) return;

        setUrl(`${apiHost}/admin/update-chapter/${courseId}/${data.chapterId}`);
        setchapterTitle(data.chapterTitle);
        setChapterNum(data.chapterNumber);
    };

    const hide = () => {
        if (hideBtRef.current) showClicked(hideBtRef.current);
        setTimeout(() => show(false), 250);
    };

    const onChange = (name: string, data: string) => {
        switch (name) {
            case 'title':
                setchapterTitle(data);
                break;
            case 'num':
                setChapterNum(parseInt(data));
        };
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!chapterTitle || !chapterNum) return setError('Please enter all  fields');

        setSubmitting(true);
        setError('');

        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chapterTitle,
                    chapterNum,
                })
            });

            if (response.status === 403) router.push('/admin-sign-in?redirected=true');
            if (response.status === 401) return setError('Chapter with number alredy exist');
            if (response.status !== 200) throw 'something went wronrg';

            setSuccess(true);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (err) {
            console.log('error in submitting create chapter', err);
            setError('Something went wrong. please try again.');
        } finally {
            setSubmitting(false);
        };
    };

    useEffect(() => {
        configure();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-blue-600 flex justify-center items-center fixed top-0 left-0 w-full h-full px-6 bg-opacity-95">
            <div className="-mt-10 bg-white rounded-xl p-3 pt-8 relative w-full">
                <button ref={hideBtRef} onClick={hide} className="w-6 h-6 bg-red-200 rounded-full absolute top-3 right-3">
                    <FontAwesomeIcon icon={faX} className="text-red-500" />
                </button>

                <form onSubmit={handleSubmit} >
                    <h3 className="mb-4 font-medium text-lg">{data ? 'Edit' : 'Create'} Chapter</h3>

                    <label htmlFor="chapter-title" className="block">Chapter title</label>
                    <input type="text" name="chapter-title" className="w-full rounded-full py-2 px-4 border-[1px] border-gray-200"
                        value={chapterTitle} onChange={(e) => onChange('title', e.target.value)}
                    />

                    <label htmlFor="chapter-number" className="block mt-4">Chapter number</label>
                    <input type="number" name="chapter-number" className="w-full rounded-full py-2 px-4 border-[1px] border-gray-200"
                        value={chapterNum} onChange={(e) => onChange('num', e.target.value)}
                    />

                    {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}
                    {success && <p className="text-center text-green-500 text-sm mt-3">Chapter {data ? 'edited' : 'created'} successfully</p>}

                    <div className="mt-4 text-right">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-full"
                            disabled={submitting}
                        >
                            {
                                submitting ? <RollerAnimation h='h-[1.5rem]' /> : ' Submit'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddChapter;
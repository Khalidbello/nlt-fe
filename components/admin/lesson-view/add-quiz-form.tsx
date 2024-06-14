import showClicked from "@/app/utils/clicked";
import RollerAnimation from "@/components/multipurpose/roller-white";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

interface AddQuizFormProps {
    hide: React.Dispatch<React.SetStateAction<boolean>>;
    courseId: number;
    chapterId: number;
    lessonId: number;
}

const AddQuizForm: React.FC<AddQuizFormProps> = ({ hide, courseId, chapterId, lessonId, }) => {
    const router = useRouter();
    const hideBtRef = useRef<HTMLButtonElement | null>(null);
    const [iSubmiting, setIsSubmiting] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [question, setQuestion] = useState<string>('');
    const [option1, setOption1] = useState<string>('');
    const [option2, setOption2] = useState<string>('');
    const [option3, setOption3] = useState<string>('');
    const [option4, setOption4] = useState<string>('');
    const [ans, setAns] = useState<string>('');
    const [error, setError] = useState<string>('');
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const [url, setUrl] = useState<string>(`${apiHost}/admin/create-quiz/${courseId}/${chapterId}/${lessonId}`);

    const configure = () => {

    };

    const hideForm = () => {
        if (hideBtRef.current) showClicked(hideBtRef.current);
        setTimeout(() => hide(false), 250);
    };

    const inputChange = (name: string, data: string) => {
        setError('');

        switch (name) {
            case 'question':
                setQuestion(data);
                break;
            case 'option1':
                setOption1(data);
                break;
            case 'option2':
                setOption2(data);
                break;
            case 'option3':
                setOption3(data);
                break;
            case 'option4':
                setOption4(data);
                break;
            case 'ans':
                setAns(data);
                break;
        };
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!question || !option1 || !option2 || !option3 || !option4 || !ans) return setError('Please enter all fields');

        setIsSubmiting(true);

        try {
            const bodyData = {
                question,
                option1,
                option2,
                option3,
                option4,
                ans
            };

            const response = await fetch(url, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });

            if (response.status === 403) return router.push('/sign-in?redirected=true');
            if (response.status !== 200) throw 'something went wrong';

            setSuccess(true);
            setTimeout(() => window.location.reload(), 2000);
        } catch (err) {
            console.log('error in submititng create quiz', err);
            setError('Something went wrong pleas try again.');
        } finally {
            setIsSubmiting(false);
        };
    };

    return (
        <div className="fixed top-0 right-0 w-full h-full flex justify-center items-center bg-blue-600 bg-opacity-85 z-50 p-4">
            <div className="relative bg-white rounded-xl p-4 overflow-auto max-h-[90%] w-full">
                <button
                    ref={hideBtRef}
                    onClick={hideForm}
                    className="absolute top-2 right-2 bg-red-100 rounded-full w-7 h-7"
                >
                    <FontAwesomeIcon icon={faX} className="text-red-500" />
                </button>

                <h2 className="font-medium">Add quiz</h2>

                <form onSubmit={handleSubmit} className="w-full">
                    <label htmlFor="question" className="">Question</label>
                    <textarea name="question"
                        className="border-[1px] border-gray-200 rounded-xl p-2 w-full h-16 block mb-3"
                        onChange={(e) => inputChange('question', e.target.value)}
                        value={question}
                    ></textarea>

                    <label htmlFor="option-1" className="">Option 1</label>
                    <input type="text" name="option-1"
                        className="border-[1px] border-gray-200 rounded-full p-2 w-full block mb-3"
                        onChange={(e) => inputChange('option1', e.target.value)}
                        value={option1}
                    />

                    <label htmlFor="option-2" className="">Option 2</label>
                    <input type="text" name="option-2"
                        className="border-[1px] border-gray-200 rounded-full p-2 w-full block mb-3"
                        onChange={(e) => inputChange('option2', e.target.value)}
                        value={option2}
                    />

                    <label htmlFor="option-3" className="">Option 1</label>
                    <input type="text" name="option-3"
                        className="border-[1px] border-gray-200 rounded-full p-2 w-full block mb-3"
                        onChange={(e) => inputChange('option3', e.target.value)}
                        value={option3}
                    />

                    <label htmlFor="option-4" className="">Option 1</label>
                    <input type="text" name="option-4"
                        className="border-[1px] border-gray-200 rounded-full p-2 w-full block mb-3"
                        onChange={(e) => inputChange('option4', e.target.value)}
                        value={option4}
                    />

                    <label htmlFor="option-1" className="">Option 1</label>
                    <input type="text"
                        className="border-[1px] border-gray-200 rounded-full p-2 w-full block mb-6"
                        onChange={(e) => inputChange('ans', e.target.value)}
                        value={ans}
                    />

                    {error && <p className="text-sm text-center text-red-500">{error}</p>}
                    {success && <p className="text-sm text-center text-green-600">{error}</p>}

                    <div className="text-right">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-full">
                            {iSubmiting ? (
                                <RollerAnimation h='h-[1.5rem]' />
                            ) : (
                                'Create'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AddQuizForm;
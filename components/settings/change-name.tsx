import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import Roller from '@/components/multipurpose/roller-white';
import showClicked from '@/app/utils/clicked';
import { useRouter } from 'next/navigation';

interface ChangeNameProps {
    hide: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChangeName: React.FC<ChangeNameProps> = ({ hide }) => {
    const router = useRouter();
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [showRoller, setShowRoller] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const closeBtRef = useRef<null | HTMLButtonElement>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('')

        if (!name || !surname) return setError('Fill all fields');

        //onSave(email);
        setShowRoller(true);

        try {
            const response = await fetch(`${apiHost}/users/change-names`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: name,
                    lastName: surname
                })
            });

            if (response.status === 403) return router.push('/sign-in?redirect=true');

            if (response.status !== 200) throw 'somthing went wrong';

            setSuccess(true);
            setTimeout(() => hide(false), 2000);
        } catch (err) {
            console.log('error in change user name');
            setError('something went wrong please try again');
        } finally {
            setShowRoller(false);
        };
    };

    const close = () => {
        showClicked(closeBtRef);
        setTimeout(() => hide(false), 250);
    }

    return (
        <div className='fixed overflow-y-auto py-4 top-0 left-0 bg-blue-500 bg-opacity-60 z-50 w-full h-full flex justify-center items-center'>
            <div className='relative my-5 mx-10 overflow-y-auto'>
                <button
                    onClick={close}
                    ref={closeBtRef}
                    className='absolute top-2 right-2 flex items-center justify-center w-10 h-10 p-1 rounded-full bg-red-50'
                >
                    <FontAwesomeIcon icon={faX} className='text-red-500' />
                </button>


                <form onSubmit={handleSubmit} className='bg-white rounded-xl mt-16 p-6'>
                    <h3 className='text-center mb-4 font-medium'>Change name</h3>
                    <div className='mb-5'>
                        <label className='block mb-2 pl-4'>Name</label>
                        <input
                            className='border-blue-50 border-[1px] text-gray-600 rounded-xl px-4 py-2'
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder=''
                        />
                    </div>
                    <div className='mb-5'>
                        <label className='block mb-2 pl-4'>Surname</label>
                        <input
                            className='border-blue-50 border-[1px] text-gray-600 rounded-xl px-4 py-2'
                            type="text"
                            value={surname}
                            onChange={handleSurnameChange}
                            placeholder=''
                        />
                    </div>

                    {error && <p className='text-sm text-red-500 text-center mb-3'>{error}</p>}
                    {success && <p className='text-sm text-green-600 text-center mb-3'>Updated succesfully</p>}
                    <div className='text-right'>
                        <button
                            className='bg-blue-500 text-white px-5 py-2 rounded-full'
                            type="submit">
                            {showRoller ? (
                                <Roller h='h-[1.5rem]' />
                            ) : (
                                'Save'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeName;

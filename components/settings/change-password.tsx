import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import Roller from '@/components/multipurpose/roller-white';
import showClicked from '@/app/utils/clicked';
import { useRouter } from 'next/navigation';

interface ChangePasswordProps {
    hide: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChangePassword: React.FC<ChangePasswordProps> = ({ hide }) => {
    const router = useRouter();
    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [showRoller, setShowRoller] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [sucessfull, setSucessfull] = useState<string>('');
    const closeBtRef = useRef<null | HTMLButtonElement>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmNewPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        //validate form data
        if (password.length < 8 || newPassword.length < 8) return setError('password length has to be atleast 8 digit');
        if (newPassword !== confirmNewPassword) return setError('New password does not match confirm new password');
        //onSave(email);
        setShowRoller(true);

        // make request to sever to 
        try {
            const response = await fetch(`${apiHost}/users/change-password`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: password,
                    newPassword: newPassword,
                })
            })

            if (response.status === 200) {
                setSucessfull('Password changed succesfully');
                setTimeout(() => hide(false), 2000);
            } else if (response.status === 401) {
                setError('The password you entred is incorrect')
            } else if (response.status === 403) {
                router.push('/sign-in?redirect=true');
            } else {
                throw 'Something went wrong';
            }
        } catch (err) {
            setError('Something went wrong')
        } finally {
            setShowRoller(false);
        }
    };

    const close = () => {
        if (closeBtRef.current) showClicked(closeBtRef.current);
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
                    <h3 className='text-center mb-4 font-medium'>Change password</h3>
                    <div className='mb-5'>
                        <label className='block mb-2 pl-4'>Old Password</label>
                        <input
                            className='border-blue-50 border-[1px] text-gray-600 rounded-xl px-4 py-2'
                            type="text"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder='password'
                        />
                    </div>
                    <div className='mb-5'>
                        <label className='block mb-2 pl-4'>New password</label>
                        <input
                            className='border-blue-50 border-[1px] text-gray-600 rounded-xl px-4 py-2'
                            type="text"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            placeholder='****'
                        />
                    </div>
                    <div className='mb-5'>
                        <label className='block mb-2 pl-4'>Confirm password</label>
                        <input
                            className='border-blue-50 border-[1px] text-gray-600 rounded-xl px-4 py-2'
                            type="text"
                            value={confirmNewPassword}
                            onChange={handleConfirmNewPasswordChange}
                            placeholder='****'
                        />
                    </div>
                    <p className='text-sm text-red-500 text-center mb-3'>{error}</p>
                    <p className='text-sm text-green-600 text-center mb-3'>{sucessfull}</p>
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

export default ChangePassword;

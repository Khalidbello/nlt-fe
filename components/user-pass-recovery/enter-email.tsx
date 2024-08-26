import Header from "@/components/multipurpose/header";
import RollerAnimation from "@/components/multipurpose/roller-white";
import { useState } from "react";

interface EnterEmailProps {
    set: React.Dispatch<React.SetStateAction<string>>;
};

const EnterEmail: React.FC<EnterEmailProps> = ({ set }) => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showRoller, setShowRoller] = useState<boolean>(false);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    // hande email submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!email) return setError('Email can not be empty');

        setShowRoller(true);

        try {
            const response = await fetch(`${apiHost}/auth/password-recovery-email`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email.trim() })
            });

            if (response.status === 404) return setError('User with email not found try again');
            if (response.status !== 200) throw 'request otp faileed';

            setTimeout(() => {
                set(email);
            }, 500);
        } catch (err) {
            setError('Something went wrong submitting email. try again');
        } finally {
            setShowRoller(false);
        };
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setError('');
    };

    return (
        <div className="w-full h-full bg-white">
            <Header heading="Email recovery" />
            <div className='h-[80%] flex justify-center items-center'>
                <form onSubmit={handleSubmit} className='bg-white rounded-xl mt-16 p-6'>
                    <div className='mb-5'>
                        <label className='block mb-2 pl-4'>Enter email to search for account</label>
                        <input
                            className='border-blue-100 border-[1px] text-gray-600 rounded-xl px-4 py-2 w-full'
                            type="email"
                            value={email}
                            placeholder='Email...'
                            onChange={handleEmailChange}
                        />
                    </div>
                    {error && <p className='text-red-500 text-sm text-center mb-3'>{error}</p>}
                    <div className='text-right'>
                        <button
                            className='bg-blue-500 text-white px-5 py-2 rounded-full'
                            type="submit"
                            disabled={showRoller}
                        >
                            {showRoller ? (
                                <RollerAnimation h='h-[1.5rem]' />
                            ) : (
                                'Search'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default EnterEmail;
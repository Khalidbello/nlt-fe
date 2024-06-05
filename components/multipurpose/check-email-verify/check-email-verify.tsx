'use client';

import { useEffect, useState } from "react";
import VerifyEmail from "./verify-email";
import { useRouter } from "next/navigation";

const CheckEmailVerify: React.FC = () => {
    const router = useRouter();
    const [showVerifyEmail, setShowVerifyEmail] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const checkEmailVerify = async () => {
        try {
            const response = await fetch(`${apiHost}/users/check-email-verify`, { credentials: 'include' });

            if (response.status === 200) {
                const data = await response.json();
                setEmail(data.email);

                if (data.status) {
                    console.log('hoe w-ekrionvi verify emai.............')
                    setShowVerifyEmail(false)
                } else {
                    console.log('hoe w-ekrionvi verify emai............. false')
                    setShowVerifyEmail(true);
                }
            } else if (response.status === 403) {
                router.push('/sign-in?redirect=true');
            }
        } catch (err) {
            console.log('error trying to verify email', err);
        }
    }

    useEffect(() => {
        checkEmailVerify()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {showVerifyEmail && <VerifyEmail email={email} hide={setShowVerifyEmail} />}
        </>
    )
}


export default CheckEmailVerify;
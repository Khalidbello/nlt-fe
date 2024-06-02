'use client';

import VerifyEmail from '@/components/home/verify-email';
import Header from '@/components/multipurpose/header';
import EnrolledCourses from '@/components/my-learning/enrolled-courses';
import { useEffect, useState } from 'react';


const MyLearning = () => {
    const [showVerifyEmail, setShowVerifyEmail] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const checkEmailVerify = async () => {
        try {
            const response = await fetch(`${apiHost}/users//check-email-verify`, { credentials: 'include' });

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
            };
        } catch (err) {
            console.log('error trying to verify email', err);
        }
    }

    useEffect(() => {
        checkEmailVerify()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="w-full h-full pt-20 px-2">
            <Header heading='My learning' />
            <EnrolledCourses />
            <div className="h-20"></div>

            {showVerifyEmail && <VerifyEmail email={email} hide={setShowVerifyEmail} />}
        </div>
    )
}


export default MyLearning;
'use client';

import CheckEmailVerify from '@/components/multipurpose/check-email-verify/check-email-verify';
import VerifyEmail from '@/components/multipurpose/check-email-verify/verify-email';
import Header from '@/components/multipurpose/header';
import EnrolledCourses from '@/components/my-learning/enrolled-courses';
import { useEffect, useState } from 'react';


const MyLearning = () => {
    return (
        <div className="w-full h-full pt-20 px-2">
            <Header heading='My learning' />
            <EnrolledCourses />
            <div className="h-20"></div>

            <CheckEmailVerify />
        </div>
    )
}


export default MyLearning;
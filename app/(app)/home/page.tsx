'use client';

import Head from '@/components/home/head';
import ContinueLearningCard from '@/components/home/continue-learning-card';
import Courses from '@/components/home/course/courses';
import CheckEmailVerify from '@/components/multipurpose/check-email-verify/check-email-verify';

const Home: React.FC = () => {
    return (
        <div className='w-full h-full pt-16 px-2'>
            <Head />
            <ContinueLearningCard />
            <Courses enrolled={false} />
            <div className='h-20'></div>

            <CheckEmailVerify />
        </div>
    )
};



export default Home;
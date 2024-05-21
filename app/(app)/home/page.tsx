'use client';

import Head from '@/components/home/head';
import ContinueLearningCard from '@/components/home/continue-learning-card';
import Courses from '@/components/home/course/courses';

const Home: React.FC = () => {
    return (
        <div className='w-full h-full pt-16 px-2'>
            <Head />
            <ContinueLearningCard />
            <Courses enrolled={false}/>
            <div className='h-20'></div>
        </div>
    )
};



export default Home;
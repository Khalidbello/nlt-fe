'use client';

import Header from '@/components/multipurpose/header';
import Name from '@/components/course-view/name';
import About from '@/components/course-view/about';
import FloatingEnrollButton from '@/components/course-view/enroll-bt';
import Chapter, { chapterType } from '@/components/course-view/chapter';
import { useEffect, useState } from 'react';
import Loader from '@/components/multipurpose/loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import DoughnutChart from '@/components/course-view/doughnu';
import ContinueLearningBT from '@/components/course-view/continue-bt';


interface courseDataType {
    courseName: string;
    about: string;
    enrolled: boolean;
    quizPerfomace: number;
    progress: number;
    chapters: chapterType[];
}

const CourseView = () => {
    const [courseData, setCourseData] = useState<courseDataType>({
        courseName: '',
        about: '',
        enrolled: false,
        quizPerfomace: 0,
        progress: 0,
        chapters: [],
    });
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const [showError, setShowError] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        setShowLoader(true);
        setShowError(false);

        // simulate data fetching
        setTimeout(() => {
            setCourseData(course);
            setShowLoader(false);
            //setShowError(true);
        }, 1000)
    }, [reload]);

    return (
        <div className="w-full h-full pt-16">
            <Header heading='Course view' />
            {showLoader ? (
                <div className="flex justify-center items-center h-[90%]">
                    <Loader h='h-[7rem]' />
                </div>
            ) : (
                <div className="">
                    {showError ? (
                        <div className="error-container mx-4 bg-red-100 text-red-500 p-4 rounded-lg shadow-md mt-8">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                            <span className="text-lg">Something went wrong</span>
                            <button onClick={() => setReload(!reload)} className="bg-white text-red-500 px-4 py-2 ml-4 rounded-md shadow-md">
                                Reload
                            </button>
                        </div>
                    ) : (
                        <Main courseData={courseData} />
                    )}
                </div>
            )}
        </div>

    );
};

const Main: React.FC<{ courseData: courseDataType }> = ({ courseData }) => {
    const data = {
        labels: ['Pending', 'completed',],
        datasets: [
            {
                data: [30, 70],
                backgroundColor: ['#f56565', '#4299e1'],
            },
        ],
    };

    return (
        <>
            <Name name={courseData.courseName} />
            {courseData.enrolled && (
                <>
                    <div className='mt-2'>
                        <h3 className='px-4 font-medium'>Quiz Performance</h3>
                        <DoughnutChart percentage={60} data={data} />
                    </div>
                    <div className="flex items-center mb-6 mx-4">
                        <p className="text-gray-600 mr-2">Progress:</p>
                        <div className="w-full h-2 rounded-full bg-gray-100">
                            <div
                                className="h-full rounded-full bg-blue-500"
                                style={{ width: `${courseData.progress.toFixed(2)}%` }}
                            />
                        </div>
                        <p className="text-gray-600 ml-2">{courseData.progress.toFixed(2)}%</p>
                    </div>
                </>
            )}
            <About text={course.about} limit={200} />
            {courseData.chapters.map((chapter: chapterType, index: number) => <Chapter key={index} chapter={chapter} />)}
            {courseData.enrolled ? (
                <ContinueLearningBT />
            ) : (
                <FloatingEnrollButton />
            )}
            <div className='h-16'></div>
        </>
    )
}
const course: courseDataType = {
    courseName: 'Cash flow',
    about: `This course take yo fro lore Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Iure, ut quos pariatur cumque eius, officiis non quaerat inventore suscipit vel rem corporis assumenda 
    consequatur? Illo ipsum velit perferendis veritatis expedita.`,
    enrolled: true,
    quizPerfomace: 70,
    progress: 30,
    chapters: [
        {
            num: 1,
            name: "Data Analysis with Python",
            completed: 'finished',
            lessons: [
                { title: "Python Basics", completed: 'finished' },
                { title: "Working with Data Structures", completed: 'finished' },
                { title: "Data Cleaning and Manipulation", completed: 'finished' },
                { title: "Exploratory Data Analysis", completed: 'finished' },
                { title: "Data Visualization with Libraries", completed: 'finished' },
            ],
        },
        {
            num: 2,
            name: "Data Analysis with Python",
            completed: 'ongoing',
            lessons: [
                { title: "Python Basics", completed: 'ongoing' },
                { title: "Working with Data Structures", completed: 'pending' },
                { title: "Data Cleaning and Manipulation", completed: 'pending' },
                { title: "Exploratory Data Analysis", completed: 'pending' },
                { title: "Data Visualization with Libraries", completed: 'pending' },
            ],
        },
        {
            num: 3,
            name: "Machine Learning Fundamentals",
            completed: 'pending',
            lessons: [
                { title: "Supervised vs. Unsupervised Learning", completed: 'pending' },
                { title: "Linear Regression", completed: 'pending' },
                { title: "Classification Algorithms", completed: 'pending' },
                { title: "Model Evaluation and Tuning", completed: 'pending' },
            ],
        },
    ]
}

export default CourseView;
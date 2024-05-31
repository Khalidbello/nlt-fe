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
import { useRouter, useSearchParams } from 'next/navigation';


interface courseDataType {
    courseName: string;
    about: string;
    enrolled: boolean;
    quizPerfomace: number;
    progress: number;
    chapters: chapterType[];
    currentChapter: number;
    currentChapterId: number;
    currentLesson: number;
    lessonNumbers: { [key: number]: number }
}

const CourseView = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [courseData, setCourseData] = useState<courseDataType>({
        courseName: '',
        about: '',
        enrolled: false,
        quizPerfomace: 0,
        progress: 0,
        chapters: [],
        currentChapter: 0,
        currentChapterId: 0,
        currentLesson: 0,
        lessonNumbers: { 0: 0 }
    });
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const [showError, setShowError] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const courseId = searchParams.get('course_id');

    const fetchData = async () => {
        try {
            setShowLoader(true);
            setShowError(false);

            const response = await fetch(`${apiHost}/users/course-view/${courseId}`, {
                method: 'GET',
                credentials: 'include',
            });

            if ((await response).status === 200) {
                const data = await response.json();
                setCourseData(data)
            } else if (response.status === 403) {
                router.push('/sign-in?redirect=true');
            } else {
                throw 'somrthng went wrong';
            }
        } catch (err) {
            console.log('error in course view', err);
            setShowError(true);
        } finally {
            setShowLoader(false);
        }
    }

    useEffect(() => {
        fetchData();
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
                        // @ts-ignore
                        <Main courseData={courseData} courseId={parseInt(courseId)} />
                    )}
                </div>
            )}
        </div>

    );
};

const Main: React.FC<{ courseData: courseDataType; courseId: number }> = ({ courseData, courseId }) => {
    const data = {
        labels: ['Failed', 'Passed',],
        datasets: [
            {
                data: [100 - courseData.quizPerfomace, courseData.quizPerfomace],
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
                        <DoughnutChart percentage={courseData.progress} data={data} />
                    </div>
                    <div className="flex items-center mb-6 mx-4">
                        <p className="text-gray-600 mr-2">Progress:</p>
                        <div className="w-full h-2 rounded-full bg-gray-100">
                            <div
                                className="h-full rounded-full bg-blue-500"
                                style={{ width: `${courseData.progress.toFixed(2)}%` }}
                            />
                        </div>
                        <p className="text-gray-600 ml-2 font-medium">{courseData.progress.toFixed(2)}%</p>
                    </div>
                </>
            )}

            <About text={courseData.about} limit={200} />

            {courseData.chapters.map((chapter: chapterType, index: number) => {
                return (
                    <Chapter
                        key={index}
                        chapter={chapter}
                        courseId={courseId}
                        lessonNumber={courseData.lessonNumbers[chapter.chapter_number]}
                        currentChapter={courseData.currentChapter}
                        currentLesson={courseData.currentLesson}
                    />
                )
            })}

            {courseData.enrolled ? (
                <ContinueLearningBT
                    courseId={courseId}
                    chapterId={courseData.currentChapterId}
                    chapterNUmber={courseData.currentChapter}
                    lessonNumber={courseData.currentLesson}
                />
            ) : (
                <FloatingEnrollButton courseId={courseId} />
            )}
            <div className='h-16'></div>
        </>
    )
}


// const course: courseDataType = {
//     courseName: 'Cash flow',
//     about: `This course take yo fro lore Lorem ipsum dolor sit amet consectetur adipisicing elit. 
//     Iure, ut quos pariatur cumque eius, officiis non quaerat inventore suscipit vel rem corporis assumenda 
//     consequatur? Illo ipsum velit perferendis veritatis expedita.`,
//     enrolled: true,
//     quizPerfomace: 70,
//     progress: 60,
//     chapters: [
//         {
//             chapter_id: 1,
//             chapter_title: "just the 1",
//             chapter_number: 1,
//             completed: "finished"
//         },
//         {
//             chapter_id: 34,
//             chapter_title: "just the 1",
//             chapter_number: 2,
//             completed: "ongoing"
//         },
//         {
//             chapter_id: 121,
//             chapter_title: "just the 1",
//             chapter_number: 3,
//             completed: undefined,
//         },
//     ],
//     currentChapter: 2,
//     currentLesson: 4,
//     lessonNumbers: {
//         1: 3,
//         2: 2,
//         3: 5,
//     }
// }

export default CourseView;
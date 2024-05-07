// 'use client';

// import Header from '@/components/multipurpose/header';
// import Chapter, { chapterType } from '@/components/course-view/chapter';
// import ContinueLearningBT from '@/components/course-view/continue-bt';
// import Name from '@/components/class/name';
// import { useEffect, useState } from 'react';
// import Loader from '@/components/multipurpose/loader';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

// interface ClassDataType {
//     courseName: string;
//     chapters: chapterType[];
// };


// const Class: React.FC = () => {
//     const [classData, setClassData] = useState<ClassDataType>({
//         courseName: '',
//         chapters: []
//     });
//     const [showLoader, setShowLoader] = useState<boolean>(true);
//     const [showError, setShowError] = useState<boolean>(false);
//     const [reload, setReload] = useState<boolean>(false);

//     useEffect(() => {
//         setShowLoader(true);
//         setShowError(false);

//         // simulate data fetching
//         setTimeout(() => {
//             setClassData(course);
//             setShowLoader(false);
//             //setShowError(true);
//         }, 1000)
//     }, [reload]);

//     return (
//         <div className="w-full h-full pt-16">
//             <Header heading='Class' />
//             {showLoader ? (
//                 <div className="flex justify-center items-center h-[90%]">
//                     <Loader h='h-[7rem]' />
//                 </div>
//             ) : (
//                 <div className="">
//                     {showError ? (
//                         <div className="error-container mx-4 bg-red-100 text-red-500 p-4 rounded-lg shadow-md mt-8">
//                             <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
//                             <span className="text-lg">Something went wrong</span>
//                             <button onClick={() => setReload(!reload)} className="bg-white text-red-500 px-4 py-2 ml-4 rounded-md shadow-md">
//                                 Reload
//                             </button>
//                         </div>
//                     ) : (
//                         <>
//                             <Name />
//                             {course.chapters.map((chapter: chapterType, index: number) => <Chapter key={index} chapter={chapter} />)}
//                             <ContinueLearningBT />
//                             <div className='h-16'></div>
//                         </>
//                     )}
//                 </div>
//             )}
//         </div>

//     );
// };


// const course: ClassDataType = {
//     courseName: 'Financial freedom 101',
//     chapters: [
//         {
//             num: 1,
//             name: "Introduction to Programming",
//             completed: true,
//             lessons: [
//                 { title: "What is Programming?", completed: 'finished' },
//                 { title: "Variables and Data Types", completed: 'finished' },
//                 { title: "Control Flow Statements", completed: 'finished' },
//                 { title: "Functions and Procedures", completed: 'finished' },
//             ],
//         },
//         {
//             num: 2,
//             name: "Data Analysis with Python",
//             completed: false,
//             lessons: [
//                 { title: "Python Basics", completed: 'finished' },
//                 { title: "Working with Data Structures", completed: 'finished' },
//                 { title: "Data Cleaning and Manipulation", completed: 'finished' },
//                 { title: "Exploratory Data Analysis", completed: 'finished' },
//                 { title: "Data Visualization with Libraries", completed: 'ongoing' },
//             ],
//         },
//         {
//             num: 3,
//             name: "Machine Learning Fundamentals",
//             completed: false,
//             lessons: [
//                 { title: "Supervised vs. Unsupervised Learning", completed: 'pending' },
//                 { title: "Linear Regression", completed: 'pending' },
//                 { title: "Classification Algorithms", completed: 'pending' },
//                 { title: "Model Evaluation and Tuning", completed: 'pending' },
//             ],
//         },
//     ],
// };

// export default Class;
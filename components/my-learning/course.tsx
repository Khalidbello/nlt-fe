import { faUser, faClock, faSchool, faChartPie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function CourseCard({ title, description, imageUrl, enrolledStudents, numChapters, numLessons, isEnrolled, progress, lastVisited }) {
    return (
        <div className="bg-blue-50 mx-3 pt-2 px-2 rounded-lg shadow-md overflow-hidden">
            <div className='w-full h-[15rem] rounded-lg bg-blue-500'>
            </div>

            <div className="p-6 flex flex-col gap-4">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    <p className="text-gray-600 line-clamp-3">{description}</p>
                </div>
                {isEnrolled ? (
                    <>
                        <div className="flex items-center text-gray-500 text-sm">
                            <FontAwesomeIcon icon={faChartPie} className='w-5 h-5 text-blue-400' />
                            <p className='ml-3'>Progress: {progress}%</p>
                        </div>
                        <div className="w-full h-2 rounded-full bg-gray-200">
                            <div
                                className="h-full rounded-full bg-blue-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                            <FontAwesomeIcon icon={faClock} className='w-5 h-5 text-blue-400' />
                            <p className='ml-3'>Last Visited: {lastVisited}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center text-gray-500 text-sm">
                            <FontAwesomeIcon icon={faUser} className='w-5 h-5 text-blue-400' />
                            <p className='ml-3'>{enrolledStudents} Students Enrolled</p>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                            <FontAwesomeIcon icon={faSchool} className='w-5 h-5 text-blue-400' />
                            <p className='ml-3'>{numChapters} Chapters, {numLessons} Lessons</p>
                        </div>
                    </>
                )}
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md inline-flex items-center justify-center">
                    {isEnrolled ? 'View Course' : 'Enroll Now'}
                </button>
            </div>
        </div>
    );
}

export default CourseCard;

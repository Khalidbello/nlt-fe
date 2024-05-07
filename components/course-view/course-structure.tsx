'use client';

import { faDharmachakra, faDownLong, faUpDown, faUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

function CourseStructure({ }) {
  const chapters = [
    {
      title: 'just testing',
      lessons: [
        {
          title: 'no taking out'
        },
        {
          title: 'no taking out 222'
        },
        {
          title: 'no taking out 66F'
        }
      ]
    },
    {
      title: 'just testing 3',
      lessons: [
        {
          title: 'no taking out'
        },
        {
          title: 'no taking out 222'
        },
        {
          title: 'no taking out 66F'
        }
      ]
    },

  ]
  const [expandedChapter, setExpandedChapter] = useState(null);

  const handleChapterClick = (chapterIndex) => {
    setExpandedChapter(chapterIndex === expandedChapter ? null : chapterIndex);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {chapters.map((chapter, index) => (
        <div key={chapter.title} className="border-b border-gray-200">
          <button
            className="w-full flex justify-between items-center p-4 pr-6 text-left text-gray-800 font-medium focus:outline-none hover:bg-gray-100"
            onClick={() => handleChapterClick(index)}
          >
            {chapter.title}
            <FontAwesomeIcon icon={expandedChapter === index ? faUpLong : faDownLong} className={`w-3 h-3 text-blue-500`} />
          </button>
          {expandedChapter === index && (
            <ul className="pl-4 list-disc ml-4">
              {chapter.lessons.map((lesson) => (
                <li key={lesson.title} className="text-gray-600 mb-1">
                  {lesson.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default CourseStructure;

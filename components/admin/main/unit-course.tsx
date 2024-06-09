import showClicked from "@/app/utils/clicked";
import { faSchool, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface courseCardProps {
    courseName: string;
    courseId: number;
    courseDescription: string;
    coursetTitle: string;
    numberOfEnrolledStudents: number;
    numberOfLessons: number;
    numberOfChapters: number;
    image: string;
}

const UnitCourse: React.FC<courseCardProps> = ({ courseId, courseName, courseDescription, image, numberOfEnrolledStudents, numberOfLessons, numberOfChapters }) => {
    const router = useRouter();
    const actionBtRef = useRef<null | HTMLButtonElement>(null);

    const handleClick = () => {
        showClicked(actionBtRef);
        setTimeout(() => router.push(`/admin/course-view?courseId=${courseId}`), 250);
    };

    return (
        <div className="bg-blue-50 mb-4 mx-3 pt-2 px-2 rounded-lg shadow-md overflow-hidden">
            <div className='w-full h-[15rem] rounded-lg bg-blue-500'>
                <Image alt='course image' src={`data:image/jpeg;base64,${image}`} height={400} width={300} className='w-full h-full rounded-lg' />
            </div>

            <div className="p-6 flex flex-col gap-4">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800">{courseName}</h3>
                    <p className="text-gray-600 line-clamp-3">{courseDescription}</p>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                    <FontAwesomeIcon icon={faUser} className='w-5 h-5 text-blue-400' />
                    <p className='ml-3'>{numberOfEnrolledStudents} Students Enrolled</p>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                    <FontAwesomeIcon icon={faSchool} className='w-5 h-5 text-blue-400' />
                    <p className='ml-3'>{numberOfChapters} Chapters, {numberOfLessons} Lessons</p>
                </div>
                <button
                    onClick={handleClick}
                    ref={actionBtRef}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md inline-flex items-center justify-center"
                >
                    View
                </button>
            </div>
        </div>
    );
}

export default UnitCourse;
import Header from '@/components/multipurpose/header';
import EnrolledCourses from '@/components/my-learning/enrolled-courses';


const MyLearning = () => {
    return (
        <div className="w-full h-full pt-20 px-2">
            <Header heading='My learning' />
            <EnrolledCourses />
            <div className="h-20"></div>
        </div>
    )
}


export default MyLearning;
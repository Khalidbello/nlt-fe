'use client';

import Courses from "@/components/admin/main/courses";
import CreateCourseBt from "@/components/admin/main/new-course-bt";
import NewCourseForm from "@/components/admin/main/new-course-form";
import Header from "@/components/multipurpose/header";
import { useEffect, useState } from "react";

const Admin: React.FC = () => {
    const [showCreateNewCourse, setShowCreateNewCourse] = useState<boolean>(false);

    return (
        <div className="w-full h-full relative">
            <Header heading="Admin" />
            <Courses />
            <CreateCourseBt show={setShowCreateNewCourse} />

            {showCreateNewCourse && <NewCourseForm show={setShowCreateNewCourse} data={null} />}
        </div>
    )
}

export default Admin;
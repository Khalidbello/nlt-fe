'use client';

import LoadingAnimation from "@/components/multipurpose/loader";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const CourseStatus: React.FC<{ status: string; courseId: number }> = ({ status, courseId }) => {
    const router = useRouter();
    const [fetching, setFetching] = useState<boolean>(false);
    const [currentStatus, setCurrentStatus] = useState<string>(status);
    const [error, setError] = useState<string>('');
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    // function to send request to change status
    const changeStatus = async (newStatus: string) => {
        setFetching(true);

        try {
            const response = await fetch(`${apiHost}/admin/set-course-status`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: newStatus,
                    courseId: courseId
                })
            });

            if (response.status === 403) {
                return router.push('/admin-sign-in');
            }

            if (response.status !== 200) {
                throw new Error('An error occurred updating course status');
            }

            setCurrentStatus(newStatus);
            setError('');
        } catch (err) {
            console.error('An error occurred updating course status', err);
            setError('Failed to update course status.');
        } finally {
            setFetching(false);
        }
    };

    const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedStatus = e.currentTarget.value;
        if (selectedStatus !== currentStatus) {
            changeStatus(selectedStatus);
        }
    };

    return (
        <div className="flex items-center justify-between px-3">
            <p>Status: </p>
            {!fetching ? (
                <form onSubmit={(e) => e.preventDefault()} className="mb-3">
                    <select
                        name="status"
                        value={currentStatus}
                        onChange={handleStatusChange}
                    >
                        <option value="soon">Coming Soon</option>
                        <option value="active">Active</option>
                        <option value="deactivated">Deactivated</option>
                    </select>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>
            ) : (
                <LoadingAnimation h="h-[1rem]" />
            )}
        </div>
    );
};

export default CourseStatus;

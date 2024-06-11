
'use client';

import showClicked from '@/app/utils/clicked';
import RollerAnimation from '@/components/multipurpose/roller-white';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faImage, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import React, { FormEvent, FormEventHandler, useEffect, useRef, useState } from 'react';

interface ImagePreviewProps {
    imageUrl: string | null; // Optional type for imageUrl
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl }) => {
    return (
        <div className="image-preview mb-4">
            {imageUrl && (

                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="Selected Image" className='rounded-xl' />
            )}
            {!imageUrl && (
                <p className="no-image-placeholder text-center bg-gray-100 rounded-xl p-4">
                    <FontAwesomeIcon icon={faImage} className='w-full h-full text-blue-500' />
                    <p> No image selected yet.</p>
                </p>
            )}
        </div>
    );
};


interface NewCourseForm {
    show: React.Dispatch<React.SetStateAction<boolean>>;
    data: {
        courseName: string;
        title: string;
        aboutCourse: string;
        price: number;
        discount: number;
        image: string;
        courseId: number
    }
}

const NewCourseForm: React.FC<NewCourseForm> = ({ show, data }) => {
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [image, setImage] = useState(null);
    const [courseName, setCourseName] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [aboutCourse, setaboutCourse] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showRoller, setShowRoller] = useState<boolean>(false);
    const [edited, setEdited] = useState<boolean>(false);
    const hideBtRef = useRef<null | HTMLButtonElement>(null);
    let apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const [url, setUrl] = useState<string>(`${apiHost}/admin/create-course`);

    // function to configure component to handle creation and update of course
    const configureComponent = () => {
        if (!data) return;

        setUrl(`${apiHost}/admin/edit-course/${data.courseId}`);
        setImageUrl(`data:image/jpeg;base64,${data.image}`);
        setCourseName(data.courseName);
        setTitle(data.title);
        setaboutCourse(data.aboutCourse);
        setPrice(data.price);
        setDiscount(data.discount);
    };

    const hide = () => {
        if (hideBtRef.current) showClicked(hideBtRef.current);
        setTimeout(() => show(false), 250);
    };

    const inputChange = (name: string, data: string) => {
        setError('');
        setEdited(true);

        switch (name) {
            case 'courseName':
                setCourseName(data);
                break;
            case 'title':
                setTitle(data);
                break;
            case 'aboutCourse':
                setaboutCourse(data);
                break;
            case 'price':
                setPrice(parseInt(data));
                break;
            case 'discount':
                setDiscount(parseInt(data));
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return; // Handle empty selection
        setEdited(true);
        // @ts-ignoreF
        setImage(file);

        setImageUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!image) return setError('Please select an image');
        if (!courseName || !title || !aboutCourse || !price || !discount) return setError('Please fill out all fields');

        setError('');
        setShowRoller(true);

        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('courseName', courseName);
            formData.append('title', title);
            formData.append('aboutCourse', aboutCourse);
            formData.append('price', price.toString());
            formData.append('discount', discount.toString());

            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {

                },
                body: formData
            });

            if (response.status === 403) return router.push('/admin-login');

            if (response.status !== 200) throw 'Something went wrong';
            setShowSuccess(true);
            setTimeout(() => window.location.reload(), 2000);
        } catch (err) {
            console.log('error in create new course', err);
            setError('Something went wrong try again.');
        } finally {
            setShowRoller(false);
        }
    };

    useEffect(() => {
        if (data) configureComponent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <div className='fixed top-0 left-0 w-full px-4 py-3 h-full bg-white z-50 overflow-auto'>
            <button ref={hideBtRef} onClick={hide} className='absolute top-4 right-4 w-6 h-6 rounded-full bg-red-100'>
                <FontAwesomeIcon icon={faX} className='text-red-500' />
            </button>

            <h2 className='font-medium mb-6'>{data ? 'Edit Course' : 'Create New Course'}</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="course-name" className='block'>Course Name</label>
                <input type="text" name='course-name' className='w-full border-[1px] border-gray-200 px-4 py-2 rounded-full'
                    onChange={(e) => inputChange('courseName', e.target.value)}
                    value={courseName}
                />

                <label htmlFor="course-title" className='block mt-4'>Course title</label>
                <input type="text" name='course-title' className='w-full border-[1px] border-gray-200 px-4 py-2 rounded-full'
                    onChange={(e) => inputChange('title', e.target.value)}
                    value={title}
                />

                <label htmlFor="course-about" className='block mt-4'>About course</label>
                <textarea name='course-title' className='w-full border-[1px] border-gray-200 px-4 py-2 rounded-xl'
                    onChange={(e) => inputChange('aboutCourse', e.target.value)}
                    value={aboutCourse}
                />

                <label htmlFor="course-price" className='block mt-4'>Course price ($)</label>
                <input type="number" name='course-price' className='w-full border-[1px] border-gray-200 px-4 py-2 rounded-full'
                    onChange={(e) => inputChange('price', e.target.value)}
                    value={price}
                />

                <label htmlFor="course-discount" className='block mt-4'>Full payment discount</label>
                <input type="number" name='course-discount' className='w-full border-[1px] border-gray-200 px-4 py-2 rounded-full'
                    onChange={(e) => inputChange('discount', e.target.value)}
                    value={discount}
                />

                <label htmlFor="imageInput" className='block mt-4'>Course Image</label>
                {
                    // @ts-ignore
                    <input type="file" id="imageInput" accept="image/*" onChange={handleImageChange} className='mb-3' />
                }

                <ImagePreview imageUrl={imageUrl} />

                {error && <p className='text-sm text-red-500 text-center'>{error}</p>}
                {showSuccess && <p className='text-sm text-green-600 text-center'> {data ? 'Course edited successfully' : 'Course created successfuly'} </p>}

                <div className='text-right mt-4'>
                    <button className={`${showRoller || !edited && 'bg-opacity-40'} px-4 py-2 rounded-full bg-blue-500 text-white`} disabled={showRoller || !edited}>
                        {showRoller ? (
                            <RollerAnimation h='h-[1rem]' />
                        ) : (
                            'Submit'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewCourseForm;

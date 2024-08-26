import { useEffect, useState } from "react";
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const Review: React.FC<{ review: any }> = ({ review }) => {
    const [image, setImage] = useState<any>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const getUserImage = async () => {
        try {
            const response = await fetch(`${apiHost}/users/user-review-dp/${review.user_id}`);
            const image = await response.json();
            setImage(image);
        } catch (err) {
            console.error('Error fetching user review image........');
        };
    };

    useEffect(() => {
        getUserImage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex-shrink-0 w-[250px] h-[25rem] bg-orange-400 rounded-lg ml-[20px] overflow-hidden relative shadow-lg">
            <div className="flex flex-col justify-between items-center w-full h-full text-white">
                <div className="text-sm text-center px-4 pt-10">
                    <p className="leading-10">{review.review}</p>
                </div>

                <div className="flex items-center mb-6 justify-start">
                    <div className="rounded-full bg-white w-16 h-16 flex items-center justify-center mr-6">
                        <div className='w-6 h-6 rounded-full'>
                            {image ? (
                                <Image alt='profile picture' height={500} width={500} src={`data:image/jpeg;base64,${image.dp}`} className="h-9 w-9 rounded-full border-[1px] border-blue-500" />
                            ) : (
                                <FontAwesomeIcon icon={faUser} className="h-5 w-5 p-2 text-blue-600 rounded-xl" />
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="text-xl font-semibold mb-1">{review.name}</div>
                        <div className="text-sm">Student</div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Review;
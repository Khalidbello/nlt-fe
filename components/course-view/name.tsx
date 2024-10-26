"use client";

import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";

interface NameProps {
  name: string;
  courseId: number;
}

const Name: React.FC<NameProps> = ({ name, courseId }) => {
  const [image, setImage] = useState<null | string>(null);
  const apiHost = process.env.NEXT_PUBLIC_API_HOST;

  const fetchImage = async () => {
    try {
      console.log("Course id for course vewwwwwwww", courseId);
      const response = await fetch(
        `${apiHost}/users/course-image/${courseId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.status == 200) {
        const data = await response.json();
        setImage(data.image);
      }
    } catch (err) {
      console.error("An error occured fetching image for course", err);
    }
  };

  useEffect(() => {
    fetchImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mb-4 px-4">
      <h2 className="mb-2 font-semibold text-xl">{name}</h2>
      <div className="mx-2 bg-blue-200 p-1 rounded-lg">
        {image ? (
          <Image
            alt="course image"
            src={`data:image/jpeg;base64,${image}`}
            objectFit="cover" // To maintain the image's aspect ratio
            height={500}
            width={500}
            className="w-full h-full rounded-lg"
          />
        ) : (
          <FontAwesomeIcon
            icon={faImage}
            className="w-full min-h-[17rem] text-gray-300"
          />
        )}
      </div>
    </div>
  );
};

export default Name;

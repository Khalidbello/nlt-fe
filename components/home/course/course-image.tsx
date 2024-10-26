"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const CourseImage: React.FC<{ courseId: number }> = ({ courseId }) => {
  const [image, setImage] = useState<null | string>(null);
  const apiHost = process.env.NEXT_PUBLIC_API_HOST;

  const fetchImage = async () => {
    try {
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
  });

  return (
    <div className="w-full rounded-lg bg-grya-200 flex items-center justify-center">
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
  );
};

export default CourseImage;

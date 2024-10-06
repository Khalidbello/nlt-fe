import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Loader from "@/components/multipurpose/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";

const Carousel: React.FC = ({}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const apiHost = process.env.NEXT_PUBLIC_API_HOST;

  const scrollToImage = (index: number) => {
    if (carouselRef.current) {
      const width = carouselRef.current.clientWidth;
      carouselRef.current.scrollTo({
        left: width * index,
        behavior: "smooth",
      });
    }
    setCurrentIndex(index);
  };

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left") {
      scrollToImage((currentIndex + 1) % images.length);
    } else {
      scrollToImage(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;
    const handleTouchMove = (moveEvent: TouchEvent) => {
      const touchEndX = moveEvent.changedTouches[0].clientX;
      if (touchStartX - touchEndX > 50) {
        handleSwipe("left");
      } else if (touchStartX - touchEndX < -50) {
        handleSwipe("right");
      }
    };

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  useEffect(() => {
    if (!isFetching && images.length > 0) {
      const intervalId = setInterval(() => {
        const nextIndex = (currentIndex + 1) % images.length;
        scrollToImage(nextIndex);
      }, 4000);

      return () => clearInterval(intervalId);
    }
  }, [currentIndex, images.length, isFetching]);

  const fetchImages = async () => {
    setIsFetching(true);
    setError("");

    try {
      const response = await fetch(`${apiHost}/users/course-images`);
      if (response.status !== 200) throw "Something went wrong";

      const data = await response.json();
      setImages(data);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="bg-blue-600 w-full h-full">
        <Image
          alt="hero"
          src="/images/hero.gif"
          objectFit="cover"
          height={1000}
          width={1000}
          className="w-full h-full"
          unoptimized
        />
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full overflow-hidden">
        {isFetching ? (
          <div className="w-full h-full flex items-center justify-center bg-blue-600 p-2">
            <Loader h="h-[4rem]" />
          </div>
        ) : (
          <>
            <div className="bg-red-500">
              <div
                ref={carouselRef}
                className="flex w-full overflow-x-auto scroll-snap-x mandatory"
                onTouchStart={handleTouchStart}
              >
                {images.map((image: any, index) => (
                  <Image
                    key={index}
                    alt="course image"
                    src={`data:image/jpeg;base64,${image.image}`}
                    objectFit="cover"
                    height={500}
                    width={500}
                    className="w-full h-full rounded-lg"
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-between px-1">
                <button
                  onClick={() => handleSwipe("right")}
                  className="bg-blue-300 bg-opacity-50 w-10 h-10 rounded-full p-2 opacity-70 hover:opacity-100"
                >
                  <FontAwesomeIcon
                    icon={faBackward}
                    className="h-4 w-4 text-blue-600"
                  />
                </button>
                <button
                  onClick={() => handleSwipe("left")}
                  className="bg-blue-300 bg-opacity-50 w-10 h-10 rounded-full p-2 opacity-70 hover:opacity-100"
                >
                  <FontAwesomeIcon
                    icon={faForward}
                    className="h-4 w-4 text-blue-600"
                  />
                </button>
              </div>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === currentIndex ? "bg-white" : "bg-gray-400"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      {/* Move this p element outside the carousel's div */}
      <p className="text-sm font-mono text-center text-blue-500 my-2 mt-4 rounded-xl">
        Latest courses
      </p>
    </>
  );
};

export default Carousel;

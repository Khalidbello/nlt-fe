import Image from "next/image";

const EasyUi: React.FC = () => {
  return (
    <div className="relative mt-36 rounded-b-xl px-5 mb-20 max-w-screen-xl mx-auto flex justify-between items-center gap-x-20 gap-y-10 md:px-20 flex-wrap-reverse md:flex-nowrap">
      {/* <div className="w-[350px] h-[400px] bg-yellow-400 transform rotate-[45deg] absolute top-[-60px] right-[-190px]"></div> */}

      <div
        className={`transition-opacity duration-[1500ms]  relative flex-shrink w-[98%] md:min-w-[50%] bg-cyan-100 rounded-2xl`}
      >
        <Image
          alt="easy ui image"
          unoptimized
          src={"/images/second.gif"}
          className="w-full rounded-xl"
          objectFit="cover" // To maintain the image's aspect ratio
          height={1000}
          width={1000}
        />
      </div>

      <div className="z-30 relative flex-shrink px-4 pb-4 rounded-b-xl overflow-hidden">
        <div className="w-[60%] h-[3px] absolute top-0 right-0 bg-purple-700"></div>
        <h3 className="font-xl md:text-4xl font-bold text-center text-blue-700 mt-3">
          Effortless Learning with Our Intuitive{" "}
          <span className="text-blue-500">Easy-to-Use</span> User Interface
        </h3>
        <p className="text-gray-700 pt-5 px-4 relative z-50">
          Our eLearning app features an intuitive and user-friendly interface
          designed to make your educational journey seamless and enjoyable.
          Navigate through courses, track your progress, and access learning
          materials effortlessly, ensuring a smooth and engaging learning
          experience for all users.
        </p>
        <div className="w-[10rem] h-[10rem] rounded-full absolute -bottom-4 -left-[3rem] bg-blue-100 z-20 bg-opacity-70"></div>
      </div>
    </div>
  );
};

export default EasyUi;

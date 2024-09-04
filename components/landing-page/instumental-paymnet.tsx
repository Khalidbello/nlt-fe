import Image from 'next/image';

const Instumental: React.FC = () => {

    return (
        <div className="relative mt-36 rounded-b-xl px-5 mb-20 max-w-screen-xl mx-auto flex justify-between items-center gap-x-20 gap-y-7 md:px-20 flex-wrap md:flex-nowrap">
            <div className="relative flex-shrink px-4 pb-4 rounded-b-xl overflow-hidden">
                <div className='w-[60%] h-[3px] absolute top-0 left-0 bg-purple-700'></div>
                <h3 className="font-xl md:text-4xl font-bold text-center text-blue-700 mt-3">
                    Our Free Enrolment Funcionlity Enables You To <span className='text-blue-600'>Explore a Course</span>  Before Actually Paying For It.
                </h3>
                <p className="text-gray-700 pt-5 px-4 relative z-30">
                    Our free enrollment functionality empowers you to explore a course thoroughly before making any payment. Take advantage of this feature to delve into course content,
                    assess teaching styles, and determine suitability at your own pace. This ensures that you can make an informed decision about your educational investment, ensuring it
                    aligns perfectly with your learning objectives.
                </p>
                <div className='w-[10rem] h-[10rem] rounded-full absolute -bottom-4 -right-[3rem] bg-blue-100 z-20 bg-opacity-70'></div>
            </div>
            <div className={`mt-[8.5rem] ml-10 mr-5 transition-opacity duration-[1500ms]  relative flex-shrink w-[98%] md:min-w-[50%] h-72 md:h-[30em] bg-blue-700 rounded-2xl`}>
                <div className='absolute -top-5 -left-5 w-full h-full rounded-2xl bg-green-100'>
                    <Image alt='easy ui image' src={'/images/informed.gif'} className='absolute -top-[8rem] md:-top-[10rem] left-0 w-full h-[140%]' width={1000} height={1000} />
                </div>
            </div>
        </div>
    );
};



export default Instumental;
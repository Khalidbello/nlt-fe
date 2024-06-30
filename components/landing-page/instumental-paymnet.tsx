import Image from 'next/image';

const Instumental: React.FC = () => {

    return (
        <div className="relative mt-36 rounded-xl px-5 mb-20 max-w-screen-xl mx-auto flex justify-between items-center gap-x-20 gap-y-10 md:px-20 flex-wrap md:flex-nowrap">
            {/* <div className="w-[350px] h-[400px] bg-yellow-400 transform rotate-[45deg] absolute top-[-60px] right-[-190px]"></div> */}

            <p className="relative flex-shrink px-4">
                <h3 className="font-xl md:text-4xl font-bold">
                    Our free enrolment funcionlity enables you to <span className='text-blue-600'>explore a course</span>  before actually paying for it.
                </h3>

                <p className="text-gray-600 pt-5">
                    Our free enrollment functionality empowers you to explore a course thoroughly before making any payment. Take advantage of this feature to delve into course content,
                    assess teaching styles, and determine suitability at your own pace. This ensures that you can make an informed decision about your educational investment, ensuring it
                    aligns perfectly with your learning objectives.
                </p>
            </p>

            <div className={`mt-[8.5rem] mr-10 ml-5 transition-opacity duration-[1500ms]  relative flex-shrink w-[98%] md:min-w-[50%] h-72 md:h-[30em] bg-blue-700 rounded-2xl`}>
                <div className='absolute -top-5 -right-5 w-full h-full rounded-2xl bg-violet-500'>
                    <Image alt='easy ui image' src={'/images/informed.gif'} className='absolute  -top-[8rem] md:-top-[11rem] left-0 w-full h-[140%]' width={500} height={500} />
                </div>
            </div>

        </div>
    );
};



export default Instumental;
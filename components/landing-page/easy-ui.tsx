import Image from 'next/image';

const EasyUi: React.FC = () => {

    return (
        <div className="relative mt-36 rounded-xl px-5 mb-20 max-w-screen-xl mx-auto flex justify-between items-center gap-x-20 gap-y-10 md:px-20 flex-wrap-reverse md:flex-nowrap">
            {/* <div className="w-[350px] h-[400px] bg-yellow-400 transform rotate-[45deg] absolute top-[-60px] right-[-190px]"></div> */}

            <div className={`mt-[8.5rem] ml-10 mr-5 transition-opacity duration-[1500ms]  relative flex-shrink w-[98%] md:min-w-[50%] h-72 md:h-[30em] bg-blue-700 rounded-2xl`}>
                <div className='absolute -top-5 -left-5 w-full h-full rounded-2xl bg-green-100'>
                    <Image alt='easy ui image' src={'/images/ui.gif'} className='absolute -top-[8rem] md:-top-[10rem] left-0 w-full h-[140%]' width={1000} height={1000} />
                </div>
            </div>


            <div className="relative flex-shrink px-4">
                <h3 className="font-xl md:text-4xl font-bold">
                    Effortless Learning with Our Intuitive <span className='text-blue-600'>Easy To</span> Use User Interface
                </h3>

                <p className="text-gray-600 pt-5">
                    Our eLearning app features an easy-to-use interface designed to make your educational journey smooth and enjoyable. Navigate through courses, track your progress,
                    and access learning materials effortlessly, ensuring a seamless and engaging learning experience for all users.
                </p>
            </div>
        </div >
    );
};



export default EasyUi;
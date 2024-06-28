import Image from 'next/image';

const NewsLetter: React.FC = () => {

    return (
        <div className="relative rounded-xl px-5 mb-20 max-w-screen-xl mx-auto flex justify-between items-center flex-wrap-reverse gap-x-20 gap-y-10 md:px-20 md:flex-nowrap">
            {/* <div className="w-[350px] h-[400px] bg-yellow-400 transform rotate-[45deg] absolute top-[-60px] right-[-190px]"></div> */}
            <div className={`mt-36 mr-10 ml-5 transition-opacity duration-[1500ms]  relative flex-shrink w-[98%] md:min-w-[50%] h-72 md:h-[30em] bg-blue-700 rounded-2xl`}>
                <div className='absolute -top-7 -right-7 w-full h-full rounded-2xl bg-cyan-300'>
                    <Image alt='easy ui image' src={'/images/newsletter.gif'} className='absolute -top-40 left-0 w-full h-[140%]' width={500} height={500} />
                </div>
            </div>

            <p className="relative flex-shrink px-4">
                <h3 className="font-medium flex flex-col">
                    <span className='text-blue-600 text-sm font-medium'>News Letter</span>
                    <span>Suscribe To Our News Letter, Be The First To Know About An Update</span>
                </h3>

                <form className="text-gray-600 pt-5">
                    <div className='flex justify-evenly items-stretch'>
                        <input type="text" placeholder='Email' className='rounded-l-xl bg-gray-100 w-[70%] px-4 py-3' />
                        <button className='bg-blue-600 text-white rounded-r-xl px-3 max-w-[6rem]'>Subscribe</button>
                    </div>
                </form>
            </p>
        </div>
    );
};



export default NewsLetter;
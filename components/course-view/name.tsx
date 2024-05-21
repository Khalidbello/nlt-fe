import Image from "next/image";

interface NameProps {
    name: string;
}

const Name: React.FC<NameProps> = ({ name }) => {
    return (
        <div className="mb-4 px-4">
            <h2 className="mb-2 font-semibold text-xl">{name}</h2>
            <div className="mx-2 bg-blue-200 p-1 rounded-lg h-[15rem]">
                <Image alt='course image' src={'/images/e-learning-1.jpg'} height={400} width={300} className='w-full h-full rounded-lg' />
            </div>
        </div>

    )
}

export default Name;
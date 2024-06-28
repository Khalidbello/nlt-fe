import { faMoneyBill, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons/faLockOpen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OurFeatures = () => {
    return (
        <div className="mt-10 mb-20 max-w-screen-xl mx-auto">
            <h2 className="flex flex-col items-center justify-center gap-1 text-center mb-3">
                <span className="text-blue-700 text-xm">Our App</span>

                <span className="text-lg font-medium">Provide Features</span>
            </h2>

            <div className="flex items-stretch justify-center  gap-x-24 gap-y-5 flex-wrap">
                {features.map((data, index) => {
                    return (
                        <p key={index} className="flex flex-col items-center justify-center gap-3 min-w-[6rem]  max-w-[20rem] rounded-2xl px-5 py-8 shadow-lg">
                            <FontAwesomeIcon icon={data.icon} className={`${data.iconColor} w-9 h-9`} />
                            <h3 className="font-medium">{data.title}</h3>
                            <p className="text-gray-700 text-sm text-center">{data.details}</p>
                        </p>
                    )
                })}
            </div>
        </div>
    );
};

const features = [
    {
        icon: faLockOpen,
        iconColor: 'text-cyan-600 ',
        title: 'Free Course Enrollment',
        details: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa repellendus perspiciatis non eos rem expedita ipsum ex? Qui tenetur architecto et ex provident fugit,',
    },
    {
        icon: faMoneyBill1Wave,
        iconColor: 'text-green-700 ',
        title: 'Free Course Enrollment',
        details: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa repellendus perspiciatis non eos rem expedita ipsum ex? Qui tenetur architecto et ex provident fugit,',
    },
    {
        icon: faLockOpen,
        iconColor: 'text-purple-500 ',
        title: 'Free Course Enrollment',
        details: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa repellendus perspiciatis non eos rem expedita ipsum ex? Qui tenetur architecto et ex provident fugit,',
    }
]

export default OurFeatures;
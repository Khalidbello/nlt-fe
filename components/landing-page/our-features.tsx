import { faCreditCard, faGraduationCap, faInfinity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OurFeatures = () => {
    return (
        <div id='features' className="mt-10 mb-20 max-w-screen-xl mx-auto">
            <h2 className="flex flex-col items-center justify-center gap-1 text-center mb-3">
                <span className="text-blue-700 text-xm font-medium">Our App</span>

                <span className="text-lg font-medium">Provide Features</span>
            </h2>

            <div className="flex items-stretch justify-center  gap-x-24 gap-y-5 flex-wrap">
                {features.map((data, index) => {
                    return (
                        <div key={index} className="flex flex-col items-center justify-center gap-3 min-w-[6rem]  max-w-[20rem] rounded-2xl px-5 py-8 shadow-lg">
                            <FontAwesomeIcon icon={data.icon} className={`${data.iconColor} w-9 h-9`} />
                            <h3 className="font-medium">{data.title}</h3>
                            <p className="text-gray-700 text-sm text-center">{data.details}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

const features = [
    {
        icon: faGraduationCap,
        iconColor: 'text-cyan-600 ',
        title: 'Free Course Enrollment',
        details: 'Free Enrollment: Begin your learning journey without any upfront payment, giving you the freedom to explore the course content at no cost.',
    },
    {
        icon: faCreditCard,
        iconColor: 'text-green-700 ',
        title: 'Flexible Installment Payments',
        details: 'We believe that financial constraints should never be a barrier to education, which is why we offer Flexible Installment Payment Plans',
    },
    {
        icon: faInfinity,
        iconColor: 'text-purple-500 ',
        title: 'Lifetime Access to Courses',
        details: 'Our lifetime access ensures flexibility and continuous learning without any time constraints. Dive into your educational journey with confidence',
    }
]

export default OurFeatures;
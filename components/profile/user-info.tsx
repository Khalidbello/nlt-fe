import { faEdit, faMailBulk, faMale, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface userInfoProps {
    email: string;
    phoneNumber: string;
    gender: string;
}

const userInfo: React.FC<userInfoProps> = ({ email, phoneNumber, gender }) => {
    return (
        <div>
            <div className="flex flex-col justify-start item-start pt-14 px-6 w-full">
                <div>Email</div>
                <div className="flex justify-between items-center pt-3 w-full">
                    <div className="flex gap-x-3 items-center justify-around w-[80%]">
                        <FontAwesomeIcon icon={faMailBulk} className={`h-5 p-2 rounded-xl bg-violet-100`} />
                        <div className="flex items-center bg-gray-500 w-[90%] rounded-xl bg-transparent">
                            {email}
                        </div>
                    </div>
                    <Link href='/settings'>
                        <FontAwesomeIcon icon={faEdit} className="text-blue-600 bg-blue-100 p-2 h-4 w-4 rounded-full" />
                    </Link>
                </div>
            </div>
            <div className="flex flex-col justify-start item-start pt-14 px-6 w-full">
                <div>Phone number</div>
                <div className="flex justify-between items-center pt-3 w-full">
                    <div className="flex gap-x-3 items-center justify-around w-[80%]">
                        <FontAwesomeIcon icon={faPhone} className={`h-5 p-2 rounded-xl bg-cyan-100`} />
                        <div className="flex items-center bg-gray-500 w-[90%] rounded-xl bg-transparent">
                            {phoneNumber}
                        </div>
                    </div>
                    <Link href='/settings'>
                        <FontAwesomeIcon icon={faEdit} className="text-blue-600 bg-blue-100 p-2 h-4 w-4 rounded-full" />
                    </Link>
                </div>
            </div>
            <div className="flex flex-col justify-start item-start pt-14 px-6 w-full">
                <div>Gender</div>
                <div className="flex justify-between items-center pt-3 w-full">
                    <div className="flex gap-x-3 items-center justify-around w-[80%]">
                        <FontAwesomeIcon icon={faMale} className={`h-5 p-2 rounded-xl bg-orange-100`} />
                        <div className="flex items-center bg-gray-500 w-[90%] rounded-xl bg-transparent">
                            {gender}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default userInfo;
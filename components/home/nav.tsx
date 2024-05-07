'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCog, faUser, faChartBar, faSignOut, faBook } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from "next/link";
import { usePathname } from "next/navigation";

type route = {
    path: string;
    path2: string;
    icon: IconProp;
    name: string;
};
const routes: route[] = [
    {
        path: '/home',
        path2: '/home',
        icon: faHome,
        name: 'Home',
    },
    {
        path: '/my-learning',
        path2: '',
        icon: faBook,
        name: 'Courses',
    },
    {
        path: '/settings',
        path2: '/settings',
        icon: faCog,
        name: 'Settings',
    }
]

export default function nav() {
    return (
        <nav className="p-1 bg-white flex items-center justify-around w-[90%] rounded-full border-solid border-[2px] border-blue-100 fixed bottom-[5px] left-[5%]">
            {routes.map(Helper)}
            <button>
                <FontAwesomeIcon icon={faSignOut} className={`text-blue-600 h-4 p-2 rounded-x}`} />
                <span className="text-sm"></span>
            </button>
        </nav>
    )
}

function Helper(data: route, index: number) {
    const currentPath = usePathname();
    return (
        <Link href={data.path} key={index} className="flex justify-center items-center gap-x-1 p-1">
            <FontAwesomeIcon icon={data.icon} className={`text-blue-600 h-4 p-2 rounded-xl ${currentPath === data.path ? 'bg-blue-100' : ''}`} />
            <span className="text-sm">{(currentPath === data.path || currentPath === data.path2) ? data.name : ''}</span>
        </Link>
    )
}
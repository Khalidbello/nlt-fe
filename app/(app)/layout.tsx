//'use client';

import NavBar from '@/components/home/nav';
//import Loading from '@/components/home/loading';

export default function Layout(
    { children }: { children: React.ReactNode }
) {
    return (
        <div className='w-full h-full'>
            {children}
            <NavBar />
        </div>
    )
}
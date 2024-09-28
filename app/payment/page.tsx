'use client';

import Header from "@/components/multipurpose/header";
import Loader from "@/components/multipurpose/loader";
import AccountDetails from "@/components/payment/accont-details";
import { Suspense } from "react";


const Page: React.FC = () => {
    return (
        <Suspense fallback={<Loader h={'h-[5rem]'} />}>
            <div className="h-full w-full">
                <Header heading="Payment" />
                <AccountDetails />
            </div>
        </Suspense>
    )
}

export default Page;
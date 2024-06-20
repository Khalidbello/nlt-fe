'use client';

import Head from "@/components/multipurpose/header";
import Former, { accountType } from "@/components/settings/former";
import SignOut from "@/components/settings/sign-out";
import { faFileAlt, faGreaterThan, faHeadphones, faKey, faMailBulk, faUser } from "@fortawesome/free-solid-svg-icons";
import ChangeEmail from "@/components/settings/change-email";
import ChangePassword from '@/components/settings/change-password';
import ChangeName from '@/components/settings/change-name';
import ContactUs from '@/components/settings/contact-us';
import ReportIssue from "@/components/settings/report-issue";
import { useState } from "react";
import { faListSquares } from "@fortawesome/free-solid-svg-icons/faListSquares";
import { faFileText } from "@fortawesome/free-solid-svg-icons/faFileText";
import CheckEmailVerify from "@/components/multipurpose/check-email-verify/check-email-verify";

export default function Page() {
    const [showChangeEmail, setShowChangeEmail] = useState<boolean>(false);
    const [showChangePasword, setShowChangePasword] = useState<boolean>(false);
    const [showChangeName, setShowChangeName] = useState<boolean>(false);
    const [showContactUs, setShowContactUs] = useState<boolean>(false);
    const [showReportIssue, setShowReportIssue] = useState<boolean>(false);

    const account: accountType = {
        name: 'Profile',
        childs: [
            {
                icon: faMailBulk,
                text: 'Change email',
                icon2: faGreaterThan,
                color: 'text-blue-400',
                action: setShowChangeEmail,
            },
            {
                icon: faFileText,
                text: 'Change name',
                icon2: faGreaterThan,
                color: 'text-orange-400',
                action: setShowChangeName,
            },
            {
                icon: faKey,
                text: 'Change password',
                icon2: faGreaterThan,
                color: 'text-purple-400',
                action: setShowChangePasword,
            }
        ]
    }

    const Support: accountType = {
        name: 'Support',
        childs: [
            {
                icon: faHeadphones,
                text: 'Contact Us',
                icon2: faGreaterThan,
                color: 'text-green-400',
                action: setShowContactUs,
            },
            {
                icon: faFileAlt,
                text: 'Report an Issue',
                icon2: faGreaterThan,
                color: 'text-red-400',
                action: setShowReportIssue,
            }
        ]
    };
    return (
        <div className='pb-20 pt-8 w-full h-full'>
            <Head heading='Setings' />
            <Former data={account} />
            <Former data={Support} />
            {/* <SignOut /> */}
            {/* add all ediing functionalitiees here */}
            {showChangeEmail && <ChangeEmail hide={setShowChangeEmail} hideVerifyEmail={null} />}
            {showChangePasword && <ChangePassword hide={setShowChangePasword} />}
            {showChangeName && <ChangeName hide={setShowChangeName} />}
            {showContactUs && <ContactUs hide={setShowContactUs} />}
            {showReportIssue && <ReportIssue hide={setShowReportIssue} />}
            <div className="h-20"></div>

            <CheckEmailVerify />
        </div>
    )
};


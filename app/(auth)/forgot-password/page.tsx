'use client';

import EnterEmail from "@/components/user-pass-recovery/enter-email";
import EnterOtp from "@/components/user-pass-recovery/enter-otp";
import { useRef, useState } from "react";

const RecoverPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [otpVerified, setOtpVerified] = useState<boolean>(false);

    if (!email) return <EnterEmail set={setEmail} />

    return <EnterOtp email={email} />
}


export default RecoverPassword;
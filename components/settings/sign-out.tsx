"use client";

import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import showClicked from "@/app/utils/clicked";
import React, { useRef } from "react";

export default function SignOut() {
  const router = useRouter();
  const signOutBtRef = useRef<null | HTMLButtonElement>(null);

  const signOut = (e: React.MouseEvent) => {
    if (signOutBtRef.current) showClicked(signOutBtRef.current);
    setTimeout(() => router.push("/sign-in"), 250);
  };

  return (
    <button
      ref={signOutBtRef}
      onClick={signOut}
      className="mx-auto flex justify-center items-center gap-4 mt-14"
    >
      <FontAwesomeIcon
        icon={faSignOut}
        className="bg-blue-50 text-blue-600 w-5 h-5 p-2 rounded-xl"
      />
      SignOut
    </button>
  );
}

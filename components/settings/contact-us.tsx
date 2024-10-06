import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import Roller from "@/components/multipurpose/roller-white";
import showClicked from "@/app/utils/clicked";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface ContactUsProps {
  hide: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactUs: React.FC<ContactUsProps> = ({ hide }) => {
  const [showRoller, setShowRoller] = useState<boolean>(false);
  const closeBtRef = useRef<null | HTMLButtonElement>(null);
  const btRef = useRef<null | HTMLButtonElement>(null);

  // WhatsApp number (replace with your actual number)
  const whatsappNumber = "+2349043454370";

  const handleWhatsAppClick = () => {
    if (btRef.current) showClicked(btRef.current);

    setTimeout(() => {
      // Construct WhatsApp URL with appropriate encoding
      const encodedNumber = encodeURIComponent(whatsappNumber);
      const url = `https://wa.me/${encodedNumber}`;

      // Open the URL in a new tab/window to prevent page takeover
      window.open(url, "_blank");
    }, 250);
  };

  const close = () => {
    if (closeBtRef.current) showClicked(closeBtRef.current);
    setTimeout(() => hide(false), 250);
  };

  return (
    <div className="fixed overflow-y-auto py-4 top-0 left-0 bg-blue-500 bg-opacity-60 z-50 w-full h-full flex justify-center items-center">
      <div className="relative my-5 mx-10 overflow-y-auto pt-16">
        <button
          onClick={close}
          ref={closeBtRef}
          className="absolute top-2 right-2 flex items-center justify-center w-10 h-10 p-1 rounded-full bg-red-50"
        >
          <FontAwesomeIcon icon={faX} className="text-red-500" />
        </button>
        <div className="bg-white rounded-xl p-4">
          <h2 className="text-center font-medium mb-4">Contact Us</h2>
          <p className="text-sm mb-4">
            {`We'd love to hear from you! Feel free to reach out to us on WhatsApp.`}
          </p>
          <button
            ref={btRef}
            className="bg-blue-500 text-sm rounded-xl p-3 text-white block mx-auto"
            onClick={handleWhatsAppClick}
          >
            Contact on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

"use client";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebook,
  faTwitter,
  faWhatsapp,
  faSlack,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { Link as ScrollLink, Element, Events, scrollSpy } from "react-scroll";
import { useEffect, useState } from "react";
import Image from "next/image";

const Footer = () => {
  const [activeSection, setActiveSection] = useState("");
  const encodedNumber = encodeURIComponent("+2349043454370");
  const whatsAppLink = `https://wa.me/${encodedNumber}`;

  useEffect(() => {
    Events.scrollEvent.register("begin", function (to, element) {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function (to, element) {
      setActiveSection(to);
    });

    // Register scroll spy
    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  return (
    <footer className="w-full bg-black text-white p-4 pb-0">
      <div className="flex justify-evenly flex-wrap gap-10 mb-6">
        <div className="flex flex-col max-w-[16rem] gap-3">
          <span className="inline-flex items-center gap-1 max-w-lg">
            <Image
              alt="logo"
              src="/images/favicon.png"
              height={300}
              width={300}
              className="text-blue-500 w-7 h-7"
            />
            <span className="font-medium">LifeStyleLeverage</span>
          </span>
          <p className="bg-gray-900 p-4 rounded-xl">
            This innovative e-learning app empowers you to become the master of
            your time and well-being. Learn in-demand skills, optimize your
            finances, and cultivate inner peace all on your schedule and from
            the comfort of your phone. Take control, leverage your lifestyle,
            and live the life you deserve with Lifestyle Leverage.
          </p>
        </div>
        <div>
          <h2 className="font-medium">Usefull Links</h2>
          <ul className="">
            <li>
              <ScrollLink
                to="features"
                smooth={true}
                duration={500}
                offset={-100}
                spy={true}
                onSetActive={() => setActiveSection("features")}
                className={`${
                  activeSection === "features" ? "text-blue-700" : " text-white"
                } mb-2 before:content-['•'] before:mr-2 before:text-2xl before:text-blue-700`}
              >
                features
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="review"
                smooth={true}
                duration={500}
                offset={-100}
                spy={true}
                onSetActive={() => setActiveSection("review")}
                className={`${
                  activeSection === "review" ? "text-blue-700" : " text-white"
                } mb-2 before:content-['•'] before:mr-2 before:text-2xl before:text-blue-700`}
              >
                Reviews
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="news-letter"
                smooth={true}
                duration={500}
                offset={-100}
                spy={true}
                onSetActive={() => setActiveSection("news-letter")}
                className={`${
                  activeSection === "news-letter"
                    ? "text-blue-700"
                    : " text-white"
                } mb-2 before:content-['•'] before:mr-2 before:text-2xl before:text-blue-700`}
              >
                News Letter
              </ScrollLink>
            </li>
            <li>
              <Link
                href="/sign-in"
                className="mb-2 text-white before:content-['•'] before:mr-2 before:text-2xl before:text-blue-700"
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link
                href="/sign-up"
                className="mb-2 text-white before:content-['•'] before:mr-2 before:text-2xl before:text-blue-700"
              >
                Sign up
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-medium">Socials</h2>
          <div className="flex items-center justify-center gap-4">
            <a
              href={whatsAppLink}
              className="flex justify-center items-center rounded-full w-10 h-10 bg-gray-950 hover:bg-indigo-950"
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="h-5 w-5 text-blue-600"
              />
            </a>
            <a
              href="https://web.facebook.com/profile.php?id=61566328816805"
              className="flex justify-center items-center rounded-full w-10 h-10 bg-gray-950 hover:bg-indigo-950"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="h-5 w-5 text-blue-600"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/lifestyle-leverage-lifestyle-leverage-a96275332/?lipi=urn%3Ali%3Apage%3Aprofile_common_profile_index%3B4e0857a2-da32-4a66-9a01-e8c2c05f9662"
              className="flex justify-center items-center rounded-full w-10 h-10 bg-gray-950 hover:bg-indigo-950"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="h-5 w-5 text-blue-600"
              />
            </a>
            <a
              href="https://x.com/LifestyleLVG"
              className="flex justify-center items-center rounded-full w-10 h-10 bg-gray-950 hover:bg-indigo-950"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className="h-5 w-5 text-blue-600"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 flex justify-center items-center p-4 rounded-t-xl">
        Copyrights 2024 rights reserved
      </div>
    </footer>
  );
};

export default Footer;

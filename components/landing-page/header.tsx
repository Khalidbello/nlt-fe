"use client";

// header for landing page
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import MobileNav from "./mobile-nav";
import { useEffect, useRef, useState } from "react";
import showClick from "@/app/utils/clicked";
import Link from "next/link";
import { Link as ScrollLink, Element, Events, scrollSpy } from "react-scroll";

const Header: React.FC = () => {
  const [flag, setFlag] = useState<boolean>(false);
  const menuBtRef = useRef<null | HTMLButtonElement>(null);

  const [activeSection, setActiveSection] = useState("");

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

  const handleMenuClick = () => {
    if (menuBtRef.current) showClick(menuBtRef.current);
    setTimeout(() => setFlag(true), 210);
  };

  return (
    <>
      <header className="z-50 fixed w-full p-3 pt-0 flex items-center justify-center">
        <div className="max-w-screen-xl bg-white w-full rounded-xl px-5 py-2 flex justify-between items-center h-16">
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

          <span className="hidden items-center justify-between gap-5 xl:gap-x-32 lg:inline-flex">
            <nav aria-label="Main Navigation">
              <ScrollLink
                to="features"
                smooth={true}
                duration={500}
                offset={-100}
                spy={true}
                onSetActive={() => setActiveSection("features")}
                className={`${
                  activeSection === "features"
                    ? "text-blue-700"
                    : " text-gray-700"
                } hover:text-blue-400 px-3 py-2 mx-1 rounded-xl text-sm`}
              >
                Features
              </ScrollLink>
              <ScrollLink
                to="review"
                smooth={true}
                duration={500}
                offset={-100}
                spy={true}
                onSetActive={() => setActiveSection("review")}
                className={`${
                  activeSection === "review"
                    ? "text-blue-700"
                    : " text-gray-700"
                } hover:text-blue-400 px-3 py-2 mx-1 rounded-xl text-sm`}
              >
                Reviews
              </ScrollLink>
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
                    : " text-gray-700"
                } hover:text-blue-400 px-3 py-2 mx-1 rounded-xl text-sm`}
              >
                News Letter
              </ScrollLink>
            </nav>
            <span className="inline-flex gap-4">
              <Link
                href="/sign-in"
                className="hover:bg-blue-500 hover:text-white px-4 py-2 border border-solid border-blue-600 text-blue-600 rounded-full"
              >
                {" "}
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:opacity-40"
              >
                {" "}
                Sign Up
              </Link>
            </span>
          </span>

          <button
            ref={menuBtRef}
            onClick={handleMenuClick}
            className=" lg:hidden"
          >
            <FontAwesomeIcon
              icon={faBars}
              className="h-4 w-4 p-2 rounded-full bg-blue-600 text-white"
            />
          </button>
        </div>
      </header>
      {flag && <MobileNav flag={flag} setFlag={setFlag} />}
    </>
  );
};

export default Header;

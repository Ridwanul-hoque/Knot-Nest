import React from "react";
import { FaPinterestP } from "react-icons/fa6";
import { CiInstagram } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="border-t border-gray-200">
      <footer className="max-w-screen-xl mx-auto py-10 px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Left - Address */}
        <div>
          <p className="text-sm">
            <a href="#" className="hover:underline text-orange-400 font-medium">
              Via Carlo Montù 78
            </a>
            <br />
            22021 Kallyanpur, Bangladesh
            <br />
            +880 1233 233 233
            <br />
            +11 5488 3866
            <br />
            <a
              href="mailto:castella@example.com"
              className="hover:underline text-orange-400"
            >
              knotnest@example.com
            </a>
          </p>
        </div>

        {/* Center - Logo and Icons */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-signature text-orange-400 mb-2">
            KnotNest
          </h1>
          <p className="text-sm mb-4 text-white">
            Semper libero, sit amet blandit vel, rhoncus venenatis
            <br />
            luctus pulvinar, hendrerit id, lorem.
          </p>
          <div className="flex gap-4">
            {[<CiTwitter className="text-orange-300"/>, <CiFacebook className="text-orange-300" />, <CiInstagram  className="text-orange-300"/>, <FaPinterestP className="text-orange-300" />].map((icon, idx) => (
              <div
                key={idx}
                className="relative w-10 h-10 border border-orange-300 rotate-45 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-orange-300 opacity-0 group-hover:opacity-100 transition-all duration-500 before:absolute before:top-0 before:left-0 before:w-full before:h-1/2 before:bg-orange-400 before:origin-top before:scale-y-0 group-hover:before:scale-y-100 before:transition-transform before:duration-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/2 after:bg-orange-400 after:origin-bottom after:scale-y-0 group-hover:after:scale-y-100 after:transition-transform after:duration-500 z-0"></div>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-orange-700 z-10">
                  {icon}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Working Hours & Mail */}
        <div className="text-sm">
          <p className="text-orange-400 mb-2 font-medium">Working hours:</p>
          <p className="mb-4 text-orange-400">Monday to Friday 9am - 5pm</p>
          <div className="relative w-full max-w-xs mx-auto">
            <input
              type="email"
              placeholder="Your mail..."
              className="w-full border border-gray-300 px-4 py-2 pr-10 focus:outline-none"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-500 cursor-pointer">
              →
            </span>
          </div>
        </div>
      </footer>

      {/* Bottom Footer */}
      <div className="text-center text-xs text-gray-600 py-4 border-t border-gray-100">
        © 2023 KnotNest, All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;

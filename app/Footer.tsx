"use client";
import React, { useContext } from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa6";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import UserContext from "./contexts/UserContext";
import ProvinceContext from "./contexts/ProvinceContext";
import Belt from "./Belt"; // This component should render the partner logos statically

const Footer = () => {
  const { user } = useContext(UserContext);
  const { province } = useContext(ProvinceContext);
  const router = useRouter();

  return (
    <footer className="bg-[#282828] text-gray-300 py-6">
      {/* Partners Belt (Static) */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
    
        <div className="flex flex-wrap justify-center items-center  gap-6">
          {/* Render your partner logos here statically.
              For example, if your Belt component already renders a row of logos without movement,
              simply include it here. Otherwise, you can inline your logo images.
          */}
          <Belt />
        </div>
      </div>

      {/* Footer Main Content */}
      <div className="flex justify-center text-center">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="text-center">
            <h2 className="text-xl text-center text-[#D4AF37] font-bold mb-4">About Us</h2>
            <p className="text-sm leading-relaxed">
              Zimbabwe Civil Liberties and Drug Network is dedicated to promoting
              sexual reproductive rights and harm reduction. Our mission is to
              empower communities with knowledge and advocate for equitable
              policies.
            </p>
          </div>
          {/* Navigation Section */}
          <div>
            <h2 className="text-xl text-center text-[#D4AF37] font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm text-center">
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => router.push("/")}
              >
                Home
              </li>
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => router.push("/about")}
              >
                About
              </li>
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => router.push("/research")}
              >
                Research
              </li>
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => router.push("/news")}
              >
                News
              </li>
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => router.push("/contact")}
              >
                Contact
              </li>
            </ul>
          </div>
          {/* Contact Section */}
          <div>
            <h2 className="text-xl text-center text-[#D4AF37] font-bold mb-4">Contact Us</h2>
            <address className="not-italic text-center text-sm">
              316 Furze Road <br />
              ParkTown, WaterFalls <br />
              Harare <br />
              Phone: 0777056475
            </address>
            <div className="flex justify-center text-center space-x-4 mt-4">
              <a
                href="https://x.com/CivilDrug"
                aria-label="Twitter"
                className="hover:text-[#D4AF37] transition duration-300"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a
                href="https://www.facebook.com/ZIMCLDN/"
                aria-label="Facebook"
                className="hover:text-[#D4AF37] transition duration-300"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="hover:text-[#D4AF37] transition duration-300"
              >
                <FaYoutube className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-600 pt-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs">
            &copy; 2024 Zimbabwe Civil Liberties and Drug Network. All rights
            reserved.
          </p>
          <div className="flex space-x-4">
            <p className="text-xs cursor-pointer hover:text-white">
              Privacy Policy
            </p>
            <p className="text-xs cursor-pointer hover:text-white">
              Terms of Service
            </p>
          </div>
        </div>
      </div>

      {/* Optional Site Setting Button */}
      {(!user && !province) && (
        <div className="flex justify-center mt-4">
          <ChakraProvider>
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#222222] transition-all duration-200 ease-in rounded"
            >
              Site Setting
            </button>
          </ChakraProvider>
        </div>
      )}

      {/* Footer Credit */}
      <div className="mt-4 text-center text-xs italic text-[#D4AF37]">
        Website by Xeudo
      </div>
    </footer>
  );
};

export default Footer;

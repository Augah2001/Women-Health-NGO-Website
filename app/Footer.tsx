'use client'
import React, { useContext } from "react";
import arasa_logo from "../public/ARASA-LOGO-2.jpg";
import alliance_logo from "../public/Logo-Love-Alliance_RGB_masterbrand-1024x453.png";
import Image from "next/image";
import Belt from "./Belt";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa6";
import { ChakraProvider, Show } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import UserContext from "./contexts/UserContext";
import ProvinceContext from "./contexts/ProvinceContext";

const Footer = () => {

  const {user} = useContext(UserContext)
  const {province} = useContext(ProvinceContext)
  
  

  const router = useRouter()
  return (
    <div className="bg-white py-12">
      {/* Partners Section */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-5xl text-[#09270f] font-semibold mb-6">
          OUR PARTNERS
        </h1>
        
        <div className="w-full">
          <Belt />
        </div>
      </div>
      <div className="h-[1px] mt-2 w-full bg-gray-300"></div>
      {/* Address and Contact Section */}
      <div className="mt-12 md:px-12 px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
        {/* Contact Information */}
        <div className="text-[#195a26] font-sans space-y-1">
          <h6>316 Furze Road</h6>
          <h6>ParkTown, WaterFalls </h6>
          <h6>Harare</h6>
          <h6>0777056475</h6>
        </div>

        
        {/* Social Media Links */}
        <div className="flex space-x-6 text-[#09270f]">
          <a
            href="https://x.com/CivilDrug"
            aria-label="Twitter"
            className="hover:text-blue-500 transition duration-300"
          >
            <FaTwitter className="text-2xl" />
          </a>
          
          <a
            href="https://www.facebook.com/ZIMCLDN/"
            aria-label="Facebook"
            className="hover:text-blue-700 transition duration-300"
          >
            <FaFacebook className="text-2xl" />
          </a>
        </div>
      </div>

      {/* Additional Information or Links */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          © 2024 Zimbabwe Civil Liberties and Drug Network. All rights reserved.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Privacy Policy | Terms of Service
        </p>
         { (
              <ChakraProvider>
                
                  {(!user  && !province) && <button
                  onClick={() => router.push("/login")}
                    className="hover:bg-white mt-3 hover:text-[#24b94f] border-[1px] ms-8
                  bg-[#0a2f14] text-yellow-400 border-[#134220]
                  font-extralight hover:border-yellow-400  px-6 py-2 transition-all duration-200 ease-in"
                  >
                    Site Setting
                  </button>}
                   
              </ChakraProvider>
            )}
      </div>
      <div className="justify-end flex mt-3 px-3 italic ">
        <p className="text-[#134220]  text-sm "> Website by Brief Technologies</p>
      </div>
    </div>
  );
};

export default Footer;

"use client";
import React from "react";
import Image from "next/image";

import LoveAlliance from "../public/Logo-Love-Alliance_RGB_masterbrand-1024x453.png";

import Ministry from "../public/ministry.png";
import CivilProtection from "../public/images.png";

const PartnersBelt = () => {
  return (
    <div className="bg-[#282828] py-6 flex justify-center items=center">
  
      <div className="flex flex-wrap items-center justify-center gap-8 px-6">
        {[
          { src: Ministry, alt: "Ministry of Health Zimbabwe" },
          { src: CivilProtection, alt: "Civil Protection in Zimbabwe" },
          { src: LoveAlliance, alt: "Love Alliance Organization" },
         
        ].map((logo, i) => (
          <Image
            key={i}
            src={logo.src}
            alt={logo.alt}
            width={80} // Smaller size
            height={80}
            className="rounded border border-[#D4AF37] p-2 bg-white"
          />
        ))}
      </div>
    </div>
  );
};

export default PartnersBelt;

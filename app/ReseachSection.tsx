import React, { useEffect } from "react";
import Carousel from "./ResearchCarousel";

import researchImg1 from "../public/IMG_9177.jpg";
import researchImg2 from "../public/IMG_9177.jpg";
import researchImg3 from "../public/IMG_9177.jpg";
import NewsCarousel from "./NewsCarousel";
import ResearchCarousel from "./ResearchCarousel";
import { useRouter } from "next/navigation";
import useResearch from "./hooks/useResearch";

const ResearchSection = () => {

  const {data,loading,error } = useResearch()

  const router  = useRouter()
 
  return (
    <div className="mt-20">
      <div className="flex mb-4 justify-center">
        <h1 className="text-4xl  text-[#0a2f14] font-normal">
          Explore Our Research
        </h1>
      </div>
      <ResearchCarousel research={data} />
      <div className="flex justify-center mt-8">
        <button
          onClick={() => router.push("/research")}
          className="bg-[#0a2f14] text-yellow-300 px-5 
         h-14 hover:bg-transparent 
         hover:text-[#051608] border-[1.5px] border-[#0a2f14] transition-all duration-500 ease-in-out"
        >
          See All Research Papers
        </button>
      </div>
    </div>
  );
};

export default ResearchSection;

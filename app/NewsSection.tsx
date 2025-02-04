import React, { useEffect } from "react";

import NewsCarousel from "./NewsCarousel";
import useNews from "./hooks/useNews";
import { useRouter } from "next/navigation";
import useFetchPaginated from "./hooks/useFetchPaginated";

const NewsSection = () => {
  

  const router = useRouter();
  const {data: news, error} = useNews()
  useEffect(() => {
   
  },[news])
  return (
    <div className="bg-[#87b791] pb-12 pt-12 mt-16">
      
      <div className="flex justify-center">
        <h1 className="text-4xl text-[#051608] font-normal">News</h1>
      </div>
      <NewsCarousel news={news} />
      <div className="flex justify-center">
        <button
            onClick={() => router.push("/news")}
            className="bg-[#0a2f14] text-yellow-300 px-5
           h-10 hover:bg-transparent
           hover:text-[#051608] border-[1.5px] border-[#0a2f14] transition-all duration-500 ease-in-out"
          >
            See All News
          </button>
      </div>
    </div>
  );
};

export default NewsSection;

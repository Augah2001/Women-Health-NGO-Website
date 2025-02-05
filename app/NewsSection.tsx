"use client";
import React from "react";
import NewsCarousel from "./NewsCarousel";
import useNews from "./hooks/useNews";
import { useRouter } from "next/navigation";

const NewsSection = () => {
  const router = useRouter();
  const { data: news, error } = useNews();

  return (
    <div className="bg-[#282828] pb-12 pt-12 mt-16">
      <div className="flex justify-center mb-8">
        <h1 className="text-4xl text-[#D4AF37] font-semibold tracking-wide">News</h1>
      </div>
      <NewsCarousel news={news} />
      <div className="flex justify-center mt-8">
        <button
          onClick={() => router.push("/news")}
          className="bg-[#D4AF37] text-[#222222] px-6 py-3 rounded-full font-semibold shadow-lg border border-[#D4AF37] transition-all duration-500 ease-in-out hover:bg-transparent hover:text-[#D4AF37]"
        >
          See All News
        </button>
      </div>
    </div>
  );
};

export default NewsSection;

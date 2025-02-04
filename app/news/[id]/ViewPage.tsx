import React, { useEffect } from "react";
import { News } from "@/app/utils/types";
import useNewsSingle from "@/app/hooks/useNewsSingle";
import Image from "next/image";

const ViewPage = ({ id }: { id: string }) => {
  const { data: news } = useNewsSingle("news", id);
  useEffect(() => {
    console.log(news?.imageUrl);
  }, [news]);

  return (
    <div className="pt-36 bg-[#bde5c5] pb-16 flex justify-center min-h-screen">
      <div className="w-[85%] max-w-4xl bg-[#DEEDCE] rounded-lg shadow-lg p-6">
        {/* News Title */}
        <h1 className="text-3xl font-semibold text-[#051608] mb-4">
          {news?.title}
        </h1>

        {/* News Image */}
        {news?.imageUrl &&(
          <div className="relative w-full h-[450px] mb-8 rounded-lg overflow-hidden shadow-md">
            <Image
              className="object-cover"
              src={news?.imageUrl}
              layout="fill"
              alt="Research"
            />
          </div>
        )}

        {/* News Date */}
        <div className="mt-8 px-5 text-right">
          <span className="text-sm text-slate-600 italic">
            {news?.date.toString().substring(0, 10)}
          </span>
        </div>

        {/* News Content */}
        <div className="mt-5 px-5">
          <p className="text-lg text-slate-800 leading-relaxed">
            {news?.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;

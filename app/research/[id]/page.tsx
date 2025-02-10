"use client";
import apiClient from "@/app/utils/apiClient";
import { Research } from "@/app/utils/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import saveAs from "file-saver";
import { downloadFile } from "@/app/utils/uploadsupabse";

interface Props {
  research: Research;
}

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const [research, setResearch] = React.useState<Research>({} as Research);
  
  



  useEffect(() => {
    apiClient.get<Research>(`/research/${id}`).then((res) => {
      console.log(res.data);
      setResearch(res.data);
    });
  }, [id]);
  return (
    <div className="">
      <div className="bg-gray-900 flex justify-center   pt-28 pb-8">
        <div className="w-[70%]  ">
          <h1 className="text-2xl font-normal text-[#D4AF37] ">
            {" "}
            {research.title}
          </h1>
          <div className=" flex justify-between">
              <h1 className="text-sm mt-1 font-thin text-[#fcf5dd] pt-1 ">
                {" "}
                {research.author}
              </h1>
              
                <button className=" bg-yellow-400 transition-transform shadow-xl ease-in-out duration-500
                  transform hover:scale-105
                  text-[#223525] px-2 py-2 "
                  disabled={typeof research.documentUrl !== "string"}
                  onClick={async()=> await downloadFile(research?.documentUrl)}
                  >
                  Download PDF
                </button>
              
          </div>
        </div>
      </div>
      <div className="relative h-[120px]">
        <div className="bg-gray-900 h-[80px]"></div>

        <div className=" absolute top-0 flex justify-center   w-[100%]">
          <div className=" bg-yellow-50">
            <Image
              src={research.imageUrl}
              alt="research image"
              width={800}
              height={800}
              className="md:max-h-[550px] layout object-cover"
            />
          </div>
        </div>

        <div className="md:h-[431px] lg:h-[550px] sm:h-[180px] xs:h-[134px] bg-gray-800"></div>
        <div className="bg-gray-900 ">
          <div className=" flex justify-center">
            <div className="w-[70%]">
              <div className="flex justify-center">
                <h1 className=" xs:mt-20 py-3 text-2xl font-normal text-[#D4AF37] ">
                  ABSTRACT
                </h1>
              </div>
              <div className="flex mt-2 justify-center bg-gray-900">
                <h1 className="text-lg font-normal text-[#fcf5dd] ">
                  {research?.abstract}
                </h1>
              </div>
              <div className="h-[2px] mt-6 w-full bg-yellow-400"></div>
              <div className="flex mt-3 mb-8 justify-center">
                <button className=" bg-yellow-400 transition-colors ease-in-out duration-400
                 hover:bg-yellow-300 hover:text-gray-800
                  text-gray-800 px-4 py-2  mt-4"
                  disabled={typeof research.documentUrl !== "string"}
                  onClick={async()=> {
                    console.log(research?.documentUrl)
                    await downloadFile(research?.documentUrl)}}
                  >
                  Download PDF
                </button>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

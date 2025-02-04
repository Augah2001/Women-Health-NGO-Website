"use client";
import useOutreachSingle from "@/app/hooks/useOutreachSingle";
import { motion } from "framer-motion";
import OutreachCarousel from "../OutreachCarousel";
import ImageCarousel from "./ImageCarousel";
import { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";
import Image from "next/image";

const ViewSingle = ({ id }: { id: string }) => {
  console.log(id);


  const { data: outreach } = useOutreachSingle(`/outreach`, id);

  useEffect(() => {
    if (outreach) {
      console.log(outreach);
    }
  }, [outreach])

  const [showImage, setShowImage] = useState(false);
  return (
    <div className=" pt-28 space-y-10   bg-[#223525]">
      {showImage && (
        <div
          onClick={() => setShowImage(false)}
          className="fixed w-screen h-screen z-50 top-0 bg-black bg-opacity-70"
        >
          <div className="flex justify-center items-center w-full h-full">
            <div
              onClick={() => setShowImage(false)}// Prevent closing when clicking inside the carousel
              className="opacity-100 px-10 w-full z-40"
            >
              <div className="mt-16">
              <div className={`w-full rounded-md size-full  hover:rounded-md relative group`}>
               
                {/* Overlay with title */}
                
              </div>
              <div className="flex justify-center  " onClick={(e) => e.stopPropagation()}>
                <div>
                  <BiX onClick={() => setShowImage(false)} size={30}className = ' mt-7 text-3xl text-red-600 hover:text-red-300'/>
                    
                  {outreach && outreach?.images.length<=1 &&<Image
                      src={outreach?.images[0].imageUrl}
                      priority
                      alt={`Image `}
                      width={450}
                      height={200}
                  
                      className="transition-opacity  rounded-md hover:rounded-md duration-300"
                    />}
                    
                </div>
                
              </div>
              {outreach&& outreach.images.length>1&& <div onClick={(e) => e.stopPropagation()}>
                <ImageCarousel images={outreach?.images} />
              </div>}
                
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <motion.h1
          className="text-4xl text-[#e6f4ea]  justify-center font-normal px-2"
          initial={{ opacity: 0, y: 20 }} // Start slightly below with zero opacity
          animate={{ opacity: 1, y: 0 }} // Animate to normal position with full opacity
          transition={{ duration: 1 }} // Duration of 1 second for the animation
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }} // Trigger when 10% is in view
        >
          <div className="flex justify-center">{outreach?.theme}</div>

          <p className="text-[#e6f4ea] text-xl flex justify-center ">
            {" "}
            {outreach?.location}
          </p>
          <p className="text-[#e6f4ea] text-sm flex justify-center ">
            {" "}
            {`${outreach?.From.toString().substring(
              0,
              10
            )} to ${outreach?.To.toString().substring(0, 10)}`}
          </p>
        </motion.h1>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Start slightly below with zero opacity
        animate={{ opacity: 1, y: 0 }} // Animate to normal position with full opacity
        transition={{ duration: 1 }} // Duration of 1 second for the animation
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="pb-12">
          <div className=" flex justify-center pb-12 ">
            <div className="w-[70%] absolute shadow-lg  rounded-lg bg-[#deedce]">
              <div className=" ">
                <div onClick={() => setShowImage(true)}>
                  <OutreachCarousel images={outreach?.images} />
                </div>
                <div className=" flex justify-center ">
                  <div className="bg-[#223525] h-[2px] w-[80%]"></div>
                </div>
              </div>
              <div className=" px-5 my-3 bg-[#deedce] pt-5 pb-8  rounded-sm justify-center">
                <div className="   border-[#223525]">
                  <h1 className="text-lg font-bold text-[#0a200e]">ACTIVITY</h1>
                  <p className="text-[#0a200e] mt-3">
                   {outreach?.body}
                  </p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewSingle;

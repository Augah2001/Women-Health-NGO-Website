"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import newspaper from "../public/newspaper.jpg";
import img_1 from "../public/386651126_738787231624635_1270710599597749514_n copy.jpg";

const Services = () => {
  const router = useRouter();

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <div className="pt-0">
     

      {/* Services Grid */}
      <h1 className="text-4xl flex justify-center  text-[#D4AF37] font-semibold tracking-wide">
          Services
        </h1>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 px-8 mt-16">
        {/* NDPO NEWS */}
        <motion.div
          className="p-6 rounded-lg shadow-lg bg-[#3b3b3b] hover:bg-[#505050] transition duration-500 cursor-pointer"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onClick={() => router.push("/news")}
        >
          <h2 className="text-xl text-[#D4AF37] font-bold underline">NDPO NEWS</h2>
          <p className="text-sm text-[#f1ebd7] mt-3 leading-relaxed">
            Stay informed with the latest updates on drug policy, research, and community outreach efforts in Zimbabwe.
          </p>
        </motion.div>

        {/* Image 1 */}
        

        {/* NDPO Situational Analysis */}
        <motion.div
          className="p-6 rounded-lg shadow-lg bg-[#3b3b3b] hover:bg-[#505050] transition duration-500 cursor-pointer"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onClick={() => router.push("/research")}
        >
          <h2 className="text-xl text-[#D4AF37] font-bold underline">Situational Analysis</h2>
          <p className="text-sm text-[#f1ebd7] mt-3 leading-relaxed">
            Gain insights into the current state of drug use and its impact on Zimbabwean society through data-driven assessments.
          </p>
        </motion.div>
        </div>
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-8 mt-10">

        {/* NDPO Working Paper Series */}
         {/* Image 2 */}
         <motion.div
          className="w-full"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image
            src={img_1}
            alt="Peer Outreach"
            height={350}
            width={500}
            className="rounded-lg shadow-lg object-cover"
          />
        </motion.div>
        <motion.div
          className="p-6 rounded-lg shadow-lg bg-[#3b3b3b] hover:bg-[#505050] transition duration-500 cursor-pointer"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onClick={() => router.push("/research/working-paper")}
        >
          <h2 className="text-xl text-[#D4AF37] font-bold underline">Working Paper Series</h2>
          <p className="text-sm text-[#f1ebd7] mt-3 leading-relaxed">
            Explore our collection of research papers that address drug-related issues and policy recommendations.
          </p>
        </motion.div>

        {/* Peer Outreach */}
        <motion.div
          className="p-6 rounded-lg shadow-lg bg-[#3b3b3b] hover:bg-[#505050] transition duration-500 cursor-pointer"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onClick={() => router.push("/news")}
        >
          <h2 className="text-xl text-[#D4AF37] font-bold underline">Peer Outreach</h2>
          <p className="text-sm text-[#f1ebd7] mt-3 leading-relaxed">
            Engage in peer outreach programs focused on education, prevention, and support for affected communities.
          </p>
        </motion.div>

       
        <motion.div
          className="w-full"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image
            src={newspaper}
            alt="NDPO News"
            width={500}
            height={350}
            quality={80}
            className="rounded-lg shadow-lg object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Services;

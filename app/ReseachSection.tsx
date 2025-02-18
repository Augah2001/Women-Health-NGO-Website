"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import useResearch from "./hooks/useResearch";

const ResearchSection = () => {
  const { data, loading, error } = useResearch();
  const router = useRouter();

  // Motion variant for research cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <div className="mt-20 bg-[#282828] shadow-sm rounded-lg py-16 px-6">
      {/* Section Title */}
      <div className="flex justify-center mb-8">
        <h1 className="text-4xl text-[#D4AF37] font-semibold tracking-wide">
          Research
        </h1>
      </div>

      {/* Research Grid */}
      {loading ? (
        <p className="text-center text-gray-300">Loading research papers...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error loading research.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((item) => (
            <motion.div
              key={item.id}
              className="bg-[#3b3b3b] rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onClick={() => router.push(`/research/${item.id}`)}
            >
              {item.imageUrl && (
                <div className="relative w-full h-48">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-2xl text-[#D4AF37] font-bold mb-2">{item.title}</h2>
                
                <p className="text-xs text-gray-400">Author: {item.author}</p>
                <p className="text-xs text-gray-400">
                  Publication Date: {new Date(item.publicationDate).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* See All Research Papers Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => router.push("/research")}
          className="bg-[#D4AF37] text-[#222222] px-6 py-3 rounded-full font-semibold shadow-lg border border-[#D4AF37] transition-all duration-500 ease-in-out hover:bg-transparent hover:text-[#D4AF37]"
        >
          See All Research Papers
        </button>
      </div>
    </div>
  );
};

export default ResearchSection;

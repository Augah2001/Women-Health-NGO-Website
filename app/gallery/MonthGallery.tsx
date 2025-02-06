// app/gallery/MonthGallery.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { Image as ImageType } from "../utils/types";

// Define the shape of the API response for type safety
interface PicturesResponse {
  data: ImageType[];
  totalCount: number;
  hasMore: boolean;
}

interface MonthGalleryProps {
  month: string; // For example, "August 2025"
  initialImages: ImageType[];
}

const MonthGallery: React.FC<MonthGalleryProps> = ({ month, initialImages }) => {
  const [images, setImages] = useState<ImageType[]>(initialImages);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const loadMore = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const res = await fetch(
        `/api/pictures?month=${encodeURIComponent(month)}&page=${nextPage}&limit=10`
      );
      const json = await res.json();
      console.log("API response:", json); // <-- Debug log
  
      // Check if json.data is an array
      if (!Array.isArray(json.data)) {
        throw new Error("API response data is not an array");
      }
  
      // Append the new images to the existing ones
      setImages((prev) => [...prev, ...json.data]);
      setPage(nextPage);
      setHasMore(json.hasMore);
    } catch (error) {
      console.error("Error loading more images for month", month, error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="mb-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl border-b-4 pb-1 inline-block border-[#D4AF37] text-[#D4AF37] mb-8">
          {month}
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden h-[250px] rounded-lg shadow-lg cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={`${image.imageUrl}?apikey=...`}
                alt={image?.ImageCollectionTitle || "image"}
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
              {/* Optional overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-medium">
                  {image?.ImageCollectionTitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {hasMore && !loading && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={loadMore}
            className="bg-[#D4AF37] rounded-md text-[#222222] px-3 py-2 transform hover:scale-105 hover:bg-[#D47800] transition-all duration-500 ease-in-out shadow-md"
          >
            Load More
          </button>
        </div>
      )}
      {loading && (
        <ChakraProvider>
          <div className="flex justify-center mt-4">
            <Spinner aria-busy color="#D4AF37" />
          </div>
        </ChakraProvider>
      )}
    </div>
  );
};

export default MonthGallery;

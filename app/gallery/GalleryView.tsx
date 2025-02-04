"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { format, parse } from "date-fns";
import { usePathname } from "next/navigation";
import placeholderImage from "../../public/IMG_9177.jpg";
import {
  BiSolidTrash,
  BiPlusCircle,
  BiX,
  BiSolidTrashAlt,
} from "react-icons/bi";
import useImages from "../hooks/useImages";
import { Image as ImageType } from "../utils/types";
import apiClient from "../utils/apiClient";
import AddForm from "./PictureForm";
import { itemVariantsLeft } from "../utils/configs";
import UserContext from "../contexts/UserContext";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { deleteFile, extractFilePathFromUrl } from "../utils/uploadsupabse";
// Helper function to group images by month

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
const groupImagesByMonth = (images: ImageType[] | null) => {
  return images?.reduce((acc: any, image) => {
    const month = format(new Date(image.date), "MMMM yyyy");
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(image);
    return acc;
  }, {});
};

// Helper function to sort months in descending order
const sortMonthsDescending = (months: string[]) => {
  return months.sort((a, b) => {
    const dateA = parse(a, "MMMM yyyy", new Date());
    const dateB = parse(b, "MMMM yyyy", new Date());
    return dateB.getTime() - dateA.getTime();
  });
};

const Gallery: React.FC = () => {
  try {
    // Code that might throw the "navigator is not defined" error
  } catch (error) {
    if (
      error instanceof ReferenceError &&
      error.message.includes("navigator is not defined")
    ) {
      // Suppress error in development
      console.warn('Suppressed "navigator is not defined" error.');
    } else {
      // Re-throw if it's a different error
      throw error;
    }
  }
  const { user } = useContext(UserContext);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [groupedImages, setGroupedImages] = useState<{
    [key: string]: ImageType[];
  } | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  const [addImage, setAddImage] = useState(false);

  const { data, hasMore, loadMore, error, loading } = useImages();

  useEffect(() => {
    if (data) {
      console.log(data);
      const filteredImages = data.filter(
        (image) => image.ImageCollectionTitle !== null
      );
      setImages(filteredImages);

      const grouped = groupImagesByMonth(filteredImages);

      setGroupedImages(grouped);
    }
  }, [data]);

  const path = usePathname();

  const handleImageClick = (image: ImageType) => {
    setSelectedImage(image);
  };

  const handleOverlayClick = () => {
    setSelectedImage(null);
  };

  const handleAddImage = () => {
    setAddImage(true);
  };

  const handleDeleteImage = async ({ id, imageUrl }: ImageType) => {
    try {
      if (!images) return;

      if (!path) return;
      const deleted = await deleteFile(imageUrl);

      if (!deleted) {
        throw new Error("Failed to delete file on the server");
      }
      // Example: Send a DELETE request to your server to delete the image
      const response = await apiClient.delete(`/pictures/${id}`);
      if (response.status === 200) {
        console.log("Image deleted successfully:", response.data);

        // Update the state to remove the image
        const newImages = images.filter((i) => i.id !== id);
        setImages(newImages);
        setGroupedImages(groupImagesByMonth(newImages));
        setAddImage(false);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="pt-28 min-h-screen space-y-10 pb-1 bg-[#223525]">
      {addImage && (
        <div
          onClick={() => setAddImage(false)}
          className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent click event from closing the modal when clicking inside the form
          >
            <AddForm onClose={() => setAddImage(false)} />
          </div>
        </div>
      )}
      <motion.h1
        className="text-5xl text-[#e6f4ea] flex justify-center  font-normal mb-7"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <h2 className="border-b-4 pb-3 inline-block border-[#637467] text-5xl text-[#e6f4ea] justify-center  font-normal mb-7">
          Image Gallery
        </h2>
      </motion.h1>

      {user && (
        <div className="mx-10 mb-5">
          <button
            className="flex items-center hover:text-[#051608]  px-3 py-2 rounded-md bg-[#deedce] hover:shadow-xl text-[#051608] hover:bg-[#dfe4da] transition-all duration-300"
            onClick={handleAddImage}
          >
            <BiPlusCircle className="mr-2 text-xl" />
            Add Image
          </button>
        </div>
      )}

      <div className="mx-10">
        {loading && (
          <ChakraProvider>
            <div className="flex justify-center mt-5">
              <Spinner aria-busy className="text-green-500" />
            </div>
          </ChakraProvider>
        )}
        {images?.length == 0 && !error && loading == false && (
          <div className="text-[#051608] mt-3">No Pictures</div>
        )}

        {error && (
          <div className="flex space-x-3">
            <div className="text-[#d5342b] mt-3">Failed to load data</div>
            <button
              className="flex items-center hover:text-[#051608]  
            px-3 py-2 rounded-md hover:bg-opacity-60  
            text-[#051608] bg-yellow-400 transition-all duration-300"
              onClick={() => window.location.reload()}
            >
              reload
            </button>
          </div>
        )}
        {groupedImages &&
          sortMonthsDescending(Object.keys(groupedImages))?.map((month) => (
            <div key={month} className="mb-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={itemVariantsLeft}
                viewport={{ once: false }}
              >
                <h2 className="text-2xl border-b-4 pb-1 inline-block border-[#637467] text-[#e6f4ea] mb-8">
                  {month}
                </h2>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={{
                  hidden: { opacity: 0, y: 0 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
                }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedImages[month]?.map((image, index) => (
                    <div key={index}>
                      <div className="justify-end my-2">
                        {user && (
                          <button
                            className=" text-xl px-3 py-1 top-2 hover:scale-110 transition-all ease-in-out duration-300 hover:bg-red-700 right-2 bg-red-500 shadow-md rounded text-white"
                            onClick={(e) => {
                              handleDeleteImage(image);
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                      <motion.div
                        className="relative overflow-hidden h-[250px] rounded-lg shadow-lg cursor-pointer group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => handleImageClick(image)}
                      >
                        <Image
                          src={`${image.imageUrl}?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljdGZteHBlY3NteHR5cXJnbWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5MTA5NjAsImV4cCI6MjA0MTQ4Njk2MH0.FlP02Y7ogF64Vx_TG0aT6bylHThsfbEOOv9mll2PCdc`}
                          alt={image?.ImageCollectionTitle || "image"}
                          width={1000}
                          height={1000}
                          className="w-full h-full object-cover"
                        />
                        {/* Overlay with title */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-lg font-medium mb-2">
                            {image?.ImageCollectionTitle}
                          </p>
                          <p className="text-white text-lg font-medium">
                            {image.collection?.title}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
      </div>

      {/* Overlay for selected image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="relative">
            <Image
              src={`${selectedImage.imageUrl}?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljdGZteHBlY3NteHR5cXJnbWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5MTA5NjAsImV4cCI6MjA0MTQ4Njk2MH0.FlP02Y7ogF64Vx_TG0aT6bylHThsfbEOOv9mll2PCdc`}
              alt={selectedImage?.collection?.title || "image"}
              width={600}
              height={600}
              className="rounded-lg"
            />
            <BiX
              className="absolute top-2 right-2 text-4xl text-red-500 cursor-pointer hover:text-red-800 transition-all duration-300"
              onClick={handleOverlayClick}
            />
          </div>
        </div>
      )}
      {hasMore && !loading && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            className="bg-[#deedce] rounded-md text-[#0c3715] px-3 h-10 transform hover:scale-105 hover:bg-[#a4bc8a] transition-all duration-500 ease-in-out"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;

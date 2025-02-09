"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ResearchCard from "./ResearchCard";
import { Research } from "../utils/types";
import apiClient from "../utils/apiClient";
import { itemVariants } from "../utils/configs";
import useDelete from "../hooks/useDelete";
import WPForm from "./working-paper/WPForm";
import ResearchForm from "./ResearchForm";
import useFormModal from "../hooks/useFormModal";
import { BiPlusCircle } from "react-icons/bi";
import ModalContext from "../contexts/ModalContext";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import useResearch from "../hooks/useResearch";
import { useRouter } from "next/navigation";

const View = () => {
  const onDelete = useDelete();
  const router = useRouter();
  const { data, error, hasMore, loadMore, loading } = useResearch();
  const [research, setResearch] = useState<Research[] | null>(data);

  useEffect(() => {
    // Process research data (e.g., convert image buffer to base64)
    const researchWithProcessedData: any = data?.map((item: any) => {
      let processedItem = { ...item };
      if (item.image) {
        const base64Image = Buffer.from(item.image).toString("base64");
        const imageUrl = `data:image/jpeg;base64,${base64Image}`;
        processedItem = { ...processedItem, imageUrl };
        delete processedItem.image;
      }
      return processedItem;
    });
    setResearch(researchWithProcessedData);
  }, [data]);

  const { selectedItemId, setSelectedItemId } = useFormModal();
  const { showModal, setShowModal } = useContext(ModalContext);
  const { user } = useContext(UserContext); 

  return (
    <div className="pb-10 pt-14 px-8 min-h-screen bg-gray-800 rounded-md text-[#E8EDCE]">
      {/* Modal for adding/editing research */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
            className="bg-gray-700 rounded-lg shadow-lg max-h-[100vh] mt-4 w-[90%] sm:w-[90%] md:w-[90%] overflow-y-auto"
          >
            <ResearchForm
              researchItems={research}
              setResearchItems={setResearch}
              id={selectedItemId?.toString()}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={itemVariants}
        viewport={{ once: true }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl border-b-4 pb-3 inline-block border-[#D4AF37] text-[#D4AF37]">
            Research Papers
          </h2>
          {user && (
            <div className="mx-10">
              <button
                className="flex items-center px-3 py-2 rounded-md bg-[#D4AF37] text-[#222222] hover:bg-[#D47800] transition-all duration-300"
                onClick={() => {
                  setSelectedItemId(undefined);
                  setShowModal(true);
                }}
              >
                <BiPlusCircle className="mr-2 text-xl" />
                Add
              </button>
            </div>
          )}
        </div>

        {loading && (
          <ChakraProvider>
            <div className="flex justify-center mt-5">
              <Spinner aria-busy color="#D4AF37" />
            </div>
          </ChakraProvider>
        )}

        {research?.length === 0 && !loading && (
          <div className="mt-3 text-[#D47800]">No Research Papers</div>
        )}

        {error && (
          <div className="flex space-x-3 items-center">
            <div className="mt-3 text-[#D47800]">Failed to load data</div>
            <button
              className="flex items-center px-3 py-2 rounded-md bg-[#D47800] text-[#E8EDCE] hover:bg-[#D4AF37] transition-all duration-300"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mt-10">
        {research?.map((research) => (
          <motion.div
            key={research.id}
            className="shadow-md rounded-md transform hover:scale-103 transition-all duration-500 ease-in-out"
          >
            <ResearchCard
              setResearch={setResearch}
              onDelete={onDelete}
              onEdit={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                setSelectedItemId(research.id);
                e.stopPropagation();
                setShowModal(true);
              }}
              research={research}
            />
          </motion.div>
        ))}
      </div>

      {hasMore && !loading && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            className="bg-[#D4AF37] rounded-md text-[#222222] px-3 h-10 transform hover:scale-105 hover:bg-[#D47800] transition-all duration-500 ease-in-out"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default View;

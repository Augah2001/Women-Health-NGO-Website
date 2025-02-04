"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ResearchCard from "./ResearchCard";
import { Research } from "../utils/types";
import apiClient from "../utils/apiClient";
import { itemVariants, itemVariantsLeft } from "../utils/configs";
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
    const controller = new AbortController();

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
    <div className="pb-10 pt-32  bg-[#bde5c5]  px-8 min-h-screen">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={itemVariants}
        viewport={{ once: true }}
      >
        {showModal && (
          <div
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()} // Prevent click event from closing the modal when clicking inside the form
              className="bg-white rounded-lg shadow-lg md:max-h-[100vh] xs:max-h-[100vh] xs:top-8 mt-4 w-[90%] sm:w-[90%] md:w-[90%] overflow-y-auto "
            >
              {
                <ResearchForm
                  researchItems={research}
                  setResearchItems={setResearch}
                  id={selectedItemId?.toString()}
                  onClose={() => setShowModal(false)}
                />
              }
            </div>
          </div>
        )}
        <div className="flex justify-between ">
          <h2 className="text-4xl border-b-4 pb-3 inline-block border-[#637467] text-[#223525] mb-8">
            Research Papers
          </h2>
          {user && (
            <div className="mx-10 mb-5 pt-2">
              <button
                className="flex items-center hover:text-[#051608]  px-3 py-2 rounded-md hover:bg-[#deedce]  text-[#051608] bg-[#dfe4da] transition-all duration-300"
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
              <Spinner aria-busy className="text-green-500" />
            </div>
          </ChakraProvider>
        )}
        {research?.length == 0 && loading == false && (
          <div className="text-[#051608] mt-3">No Research Papers</div>
        )}

        {error && (
          <div className="flex space-x-3">
            <div className="text-[#d5342b] mt-3">Failed to load data</div>
            <button className="flex items-center hover:text-[#051608]  
            px-3 py-2 rounded-md hover:bg-opacity-60  
            text-[#051608] bg-yellow-400 transition-all duration-300"
            onClick={() =>window.location.reload()}
            >reload</button>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10  w-full">
        {research?.map((research) => (
          <div
            key={research.id}
            className="shadow-lg transform hover:scale-105 transition-all duration-500 ease-in-out"
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
          </div>
        ))}
      </div>
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

export default View;

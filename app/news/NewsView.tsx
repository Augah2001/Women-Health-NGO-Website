"use client";
import apiClient from "../utils/apiClient";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import NewsCard from "./NewsCard";
import { News } from "@/app/utils/types";
import { itemVariantsLeft } from "@/app/utils/configs";
import useFormModal from "@/app/hooks/useFormModal";
import ModalContext from "@/app/contexts/ModalContext";
import NewsForm from "./[id]/NewsForm";
import { BiPlusCircle } from "react-icons/bi";
import UserContext from "../contexts/UserContext";
import useNews from "../hooks/useNews";
import useDataUpdate from "../hooks/useDataUpdate";
import useFetchPaginated from "../hooks/useFetchPaginated";
import { ChakraProvider, Spinner } from "@chakra-ui/react";

const View = () => {
  
  
  
const { data, loading, error, hasMore,loadMore } = useNews()


  const {user} = useContext(UserContext)

 
  

  const [news, setNews] = useDataUpdate<News[]>(data)

  const { selectedItemId, setSelectedItemId } = useFormModal();

  const { showModal, setShowModal } = useContext(ModalContext);

  return (
    <div className="pb-10   bg-[#bde5c5] min-h-screen">
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
              <NewsForm
                setNewsList={setNews}
                id={selectedItemId?.toString()}
                onClose={() => setShowModal(false)}
              />
            }
          </div>
        </div>
      )}

      <motion.div
        className="text-4xl px-4 pt-28 text-gray-900 border-b-[1px] border-b-[#aed9b6] bg-[#aed9b6] font-normal mb-8"
        initial="hidden"
        whileInView="visible"
        variants={itemVariantsLeft}
        viewport={{ once: false }}
      >
        <div className="flex justify-between">
          <h2 className="text-5xl border-b-4 pb-3 inline-block border-[#637467] text-[#223525] mb-8">
            News
          </h2>
          {user &&
            <div className=" mb-5 pt-2">
              <button
                className="flex items-center text-xl hover:text-[#051608]  px-3 py-2 rounded-md hover:bg-[#deedce]  text-[#051608] bg-[#dfe4da] transition-all duration-300"
                onClick={() => {
                  setSelectedItemId(undefined);
                  setShowModal(true);
                }}
              >
                <BiPlusCircle className="mr-2 text-xl" />
                Add
              </button>
            </div>
          }
        </div>
      </motion.div>
      <div className="grid px-4 pt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
      { loading && (
          <ChakraProvider>
            <div className="flex justify-center mt-5">
              <Spinner aria-busy className="text-green-500" />
            </div>
          </ChakraProvider>
        )}
        {news?.length == 0 &&!error && loading == false && (
          <div className="text-[#051608] mt-3">No News</div>
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
        {news?.map((news) => (
          <div key={news.id} className="shadow-lg">
            <NewsCard
              onEdit={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                setSelectedItemId(news.id);
                e.stopPropagation();
                setShowModal(true);
              }}
              news={news}
              setNews={setNews}
            />
          </div>
        ))}
      </div>
      {hasMore && !loading && (
      <div className="mt-8 flex justify-center">
        <button onClick={loadMore} className="bg-[#deedce] rounded-md text-[#0c3715] px-3 h-10 transform hover:scale-105 hover:bg-[#a4bc8a] transition-all duration-500 ease-in-out">
        Read More
            </button>
      </div>
    )}
    </div>
  );
};

export default View;

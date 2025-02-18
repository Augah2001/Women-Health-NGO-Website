"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import NewsCard from "./NewsCard";
import { News } from "@/app/utils/types";
import { itemVariants } from "@/app/utils/configs";
import useFormModal from "@/app/hooks/useFormModal";
import ModalContext from "@/app/contexts/ModalContext";
import NewsForm from "./[id]/NewsForm";
import { BiPlusCircle } from "react-icons/bi";
import UserContext from "../contexts/UserContext";
import useNews from "../hooks/useNews";
import { ChakraProvider, Spinner } from "@chakra-ui/react";

const View = () => {
  const { data, loading, error, hasMore, loadMore } = useNews();
  const { user } = useContext(UserContext);
  const { selectedItemId, setSelectedItemId } = useFormModal();
  const { showModal, setShowModal } = useContext(ModalContext);
  const [news, setNews] = useState<News[] | null>(data);

  useEffect(() => {
    setNews(data);
  }, [data]);

  return (
    <div className="pb-10  px-8 min-h-screen pt-40 bg-gray-900 rounded-md text-[#E8EDCE]">
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-700 rounded-lg shadow-lg max-h-[100vh] mt-4 w-[90%] sm:w-[90%] md:w-[90%] overflow-y-auto"
          >
            <NewsForm
              newsItems={news}
              setNewsItems={setNews}
              id={selectedItemId?.toString()}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}

      <motion.div initial="hidden" whileInView="visible" variants={itemVariants} viewport={{ once: true }}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl border-b-4 pb-3 inline-block border-[#D4AF37] text-[#D4AF37]">
            News & Updates
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

        {news?.length === 0 && !loading && (
          <div className="mt-3 text-[#D47800]">No News Available</div>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mt-10">
        {news?.map((newsItem) => (
          <motion.div
            key={newsItem.id}
            className=" rounded-md  transform hover:scale-103 transition-all duration-500 ease-in-out"
          >
            <NewsCard
              setNews={setNews}
              onEdit={(e) => {
                setSelectedItemId(newsItem.id);
                e.stopPropagation();
                setShowModal(true);
              }}
              news={newsItem}
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
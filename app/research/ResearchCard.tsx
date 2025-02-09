"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChakraProvider, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import UserContext from "../contexts/UserContext";

interface Research {
  id: number;
  title: string;
  abstract: string;
  publicationDate: string;
  documentUrl: string;
  imageUrl: string;
  author: string;
}

interface Props {
  research: Research | null | undefined;
  onEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDelete: (
    endpoint: string,
    {
      id,
      imageUrl,
      documentUrl,
    }: { id: string | number | undefined; imageUrl?: string; documentUrl?: string },
    setData: React.Dispatch<React.SetStateAction<Research[] | null>>,
    successMessage?: string,
    errorMessagePrefix?: string
  ) => Promise<void>;
  setResearch: React.Dispatch<React.SetStateAction<Research[] | null>>;
}

const ResearchCard = ({ research, onEdit, onDelete, setResearch }: Props) => {
  const router = useRouter();
  const blobUrl = research?.imageUrl;

  const slideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const { user } = useContext(UserContext);

  return (
    <motion.div
      className="bg-gray-700 h-full flex flex-col justify-between transition-colors duration-300"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      variants={slideVariants}
    >
      {blobUrl && (
        <Image
          className="w-full object-cover"
          src={blobUrl}
          width={1000}
          height={1000}
          alt="research"
        />
      )}
      <div className="flex-grow p-4">
        <h2 className="text-xl font-bold text-[#D4AF37] mt-2">
          {research?.title}
        </h2>
        <p className="text-sm text-[#E8EDCE] mt-1">
          Author: {research?.author}
        </p>
        <p className="text-xs text-[#E8EDCE] mt-2">
          {research?.publicationDate.toString().substring(0, 10)}
        </p>
      </div>
      <div className="flex justify-between items-center p-4">
        <button
          className="bg-[#D4AF37] text-[#222222] px-4 py-2 rounded-full font-semibold shadow-md border border-[#D4AF37] transition-all duration-500 ease-in-out hover:bg-transparent hover:text-[#D4AF37]"
          onClick={() => router.push(`/research/${research?.id}`)}
        >
          Read More
        </button>
        {user && (
          <ChakraProvider>
            <div className="flex space-x-2">
              <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                size="sm"
                variant="outline"
                borderColor="#D4AF37"
                color="#D4AF37"
                _hover={{ bg: "transparent", color: "#D4AF37", borderColor: "#D4AF37" }}
                onClick={(e) => onEdit(e)}
              />
              <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                size="sm"
                variant="outline"
                borderColor="#D4AF37"
                colorScheme="red"
                _hover={{ bg: "transparent", color: "#D4AF37", borderColor: "#D4AF37" }}
                onClick={
                  research
                    ? () =>
                        onDelete(
                          "research",
                          { id: research?.id, imageUrl: research?.imageUrl, documentUrl: research?.documentUrl },
                          setResearch
                        )
                    : () => {}
                }
              />
            </div>
          </ChakraProvider>
        )}
      </div>
    </motion.div>
  );
};

export default ResearchCard;

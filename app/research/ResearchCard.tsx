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
    {id, imageUrl, documentUrl}:
        {id: string | number | undefined, imageUrl?: string, documentUrl?: string},
    setData: React.Dispatch<React.SetStateAction<any>>,
    successMessage?: string,
    errorMessagePrefix?: string
  ) => Promise<void>;
  setResearch: React.Dispatch<React.SetStateAction<Research[] | null>>
}

const ResearchCard = ({ research, onEdit, onDelete, setResearch }: Props) => {
  const router = useRouter();
  const blobUrl = research?.imageUrl;

  const slideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const {user} = useContext(UserContext);

  return (
    <motion.div
      className="bg-[#aed9b6]  h-full flex flex-col justify-between"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      variants={slideVariants}
    >
      {blobUrl&&<Image
        className="w-[100%] overflow-hidden"
        src={blobUrl}
        width={1000}
        height={1000}
        alt="research"
      />}
      <div className="flex-grow p-2 relative">
        <h2 className="text-md text-gray-900 mt-2 font-normal">
          {research?.title}
        </h2>
        <h2 className="text-md text-gray-950 mt-2 font-normal">
          Author: {research?.author}
        </h2>
        <p className="text-gray-600 mt-3 text-xs">
          {research?.publicationDate.toString().substring(0, 10)}
        </p>
      </div>
      <div className="flex justify-between items-center p-4">
        <button
          className="bg-[#07220f] text-yellow-300 px-3 h-12 mb-2
                hover:bg-transparent
                hover:text-[#07220f] border-[1.5px] border-[#07220f] transition-all duration-500 ease-in-out"
          onClick={() => router.push(`/research/${research?.id}`)}
        >
          Read More
        </button>
        {user && <ChakraProvider>
          <div className="flex space-x-2">
            <IconButton
              aria-label="Edit"
              icon={<EditIcon />}
              size="sm"
              variant="outline"
              colorScheme="yellow"
              onClick={(e) => onEdit(e)}
            />
            <IconButton
              aria-label="Delete"
              icon={<DeleteIcon />}
              size="sm"
              variant="outline"
              colorScheme="red"
              onClick={research? () => onDelete('research', {id:research?.id, imageUrl: research?.imageUrl, documentUrl: research?.documentUrl}, setResearch): ()=> {}}
            />
          </div>
        </ChakraProvider>}
      </div>
    </motion.div>
  );
};

export default ResearchCard;

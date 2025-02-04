'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import img from '../../../../public/IMG_9177.jpg';
import { ChakraProvider, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import useDelete from '@/app/hooks/useDelete';
import UserContext from '../contexts/UserContext';

interface News {
  id?: number;
  title: string;
  body: string;
  date: string | Date;
  [key: string]: any; // Allow additional properties
  imageUrl?: string;
}

interface Props {
  onEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  news: News;
  setNews:  React.Dispatch<React.SetStateAction<any>>
}

const NewsCard = ({ news, setNews, onEdit }: Props) => {

  const {user} =useContext(UserContext)
  const blobUrl = news.imageUrl;
  const router = useRouter();

  const slideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const onDelete = useDelete()

  return (
    <motion.div
      className="bg-[#aed9b6] h-full flex flex-col justify-between"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      variants={slideVariants}
    >
      {blobUrl &&<Image className="w-full" src={blobUrl} width={300} alt="news" height={200} />}
      
      <div className="p-4 flex-grow">
        <p className="text-gray-600 mt-1 text-sm">
          {news.date.toString().substring(0, 10)}
        </p>
        <h2 className="text-md text-gray-900 mt-2 font-normal">{news.title}</h2>
      </div>

      {/* Button Container */}
      <div className="flex justify-between items-center  px-4 pb-6">
        {/* Left Side - Read More Button */}
        <div className="flex justify-center ">
        <button
          onClick={() => router.push("/news/" + news.id)}
          className="bg-[#0a2f14] rounded-sm text-yellow-300 px-3
         h-10 hover:bg-transparent 
         hover:text-[#051608] border-[1.5px] border-[#0a2f14] transition-all duration-500 ease-in-out"
        >
          Read More
        </button>
      </div>

        {/* Right Side - Edit and Delete Buttons */}
        { user && <ChakraProvider>
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
              onClick={() => onDelete('news', {id:news.id, documentUrl:news.documentUrl, imageUrl:news.imageUrl}, setNews)}
            />
          </div>
        </ChakraProvider>}
      </div>
    </motion.div>
  );
};

export default NewsCard;

'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import useDelete from '@/app/hooks/useDelete';
import UserContext from '../contexts/UserContext';
import { BiPencil as Pencil, BiTrash as Trash } from 'react-icons/bi';

interface News {
  id?: number;
  title: string;
  body: string;
  date: string | Date;
  imageUrl?: string;
  documentUrl?: string;
}

interface Props {
  onEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  news: News;
  setNews: React.Dispatch<React.SetStateAction<any>>;
}

const NewsCard = ({ news, setNews, onEdit }: Props) => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const onDelete = useDelete();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
    >
      <div className="bg-[#212121] text-gold-400 border-none shadow-lg rounded-lg overflow-hidden">
        {/* Image */}
        {news.imageUrl && (
          <Image className="w-full object-cover" src={news.imageUrl} width={300} alt="news" height={200} />
        )}

        {/* Content */}
        <div className="p-4">
          <p className="text-[#f7ebc6] text-sm">{news.date.toString().substring(0, 10)}</p>
          <h2 className="text-lg text-[#D4AF37] mt-2 font-semibold">{news.title}</h2>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center px-4 pb-4">
          {/* Read More */}
          <button
           className="bg-[#D4AF37] text-[#222222] px-4 py-2 rounded-md font-semibold shadow-md border border-[#D4AF37] transition-all duration-500 ease-in-out hover:bg-transparent hover:text-[#D4AF37]"
           onClick={() => router.push(`/news/${news.id}`)}
          >
            Read More
          </button>

          {/* Edit & Delete */}
          {user && (
            <div className="flex space-x-2">
              <button
                className="p-2 border border-gold-400 rounded-md text-gold-300 hover:bg-gold-500 hover:text-black transition"
                onClick={onEdit}
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                className="p-2 border border-red-500 text-red-400 rounded-md hover:bg-red-500 hover:text-black transition"
                onClick={() => onDelete('news', { id: news.id, documentUrl: news.documentUrl, imageUrl: news.imageUrl }, setNews)}
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;

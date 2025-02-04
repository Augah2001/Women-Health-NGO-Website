'use client';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { News } from './utils/types';



interface Props {
  news: News[] | null;
}

const Carousel = ({ news }: Props) => {
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 2, // You might want to adjust this dynamically as well
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const slideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  

  return (
    <div className="p-8">
      <Slider {...settings}>
        {news?.map((item, index) => (
          <motion.div
            key={index}
            className="p-4 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            variants={slideVariants}
          >
            <div className={`w- h-40 relative group`}>
              {item.imageUrl && <Image
                src={item.imageUrl}
                alt={`Research ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-300"
              />}
              <div className="absolute inset-0 bg-black bg-opacity-40 px-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
               
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 px-5  group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h2 className="text-white text-md font-bold">{item.title}</h2>
              </div>
            </div>
            <div className="p-4 bg-[#bde5c5]">
              <h2 className="text-xs font-normal text-gray-700">Date:{" "}{item.date.toString().substring(0,10)}</h2>
              <div className="flex justify-center mt-4">
                <button className="bg-black text-white px-3 h-10 hover:bg-transparent hover:text-black border-[1.5px] border-black transition-all duration-500 ease-in-out">
                  Read More
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

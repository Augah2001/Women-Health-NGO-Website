'use client';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Research } from './utils/types';



interface Props {
  research: Research[] | null;
 
}

const Carousel = ({ research }: Props) => {
  const [slidesToShow, setSlidesToShow] = useState(1.5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(1.5);
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
    slidesToShow, // Use the dynamic slidesToShow value
    slidesToScroll: 1,
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
        {research?.map((item, index) => (
          <motion.div
            key={index}
            className="p-2 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            variants={slideVariants}
          >
            <div className={`w-full h-80 relative group`}>
              <Image
                src={item.imageUrl}
                alt={`Research ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 px-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h2 className="text-yellow-300 text-3xl font-bold">{item.title}</h2>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 px-5  group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h2 className="text-yellow-300 xs:md md:text-3xl font-bold">{item.title}</h2>
              </div>
            </div>
            <div className=" p-4 bg-[#87b791]">
              
              <p className="mt-2 ms-2 text-slate-900 leading-relaxed">
                {`Author: ${item.author}`}
              </p>
              <p className="mt-1 ms-2 text-xs text-slate-900 leading-relaxed">
                {`Publication Date: ${item.publicationDate.toString().substring(0,10)}`}
              </p>
            </div>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

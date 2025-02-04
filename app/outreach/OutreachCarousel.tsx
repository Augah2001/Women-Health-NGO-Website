'use client';
import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { debounce } from 'lodash'; // Import debounce from lodash
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Image as Picture } from '../utils/types';

interface Props {
  images: Picture[] | null | undefined;
}

const Carousel = ({ images }: Props) => {


  const [slidesToShow, setSlidesToShow] = useState(1.5);
  const sliderRef = useRef<Slider | null>(null);
  const innerSliderRef = useRef<Slider | null>(null);

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
    infinite: images && images.length > 1 ? true : false, // Ensure it returns a boolean
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: images && images.length > 1 ? true : false, // Ensure it returns a boolean
    autoplaySpeed: 2000,
    arrows: false,
    afterChange: (currentSlide: any) => {
      if (innerSliderRef.current) {
        innerSliderRef.current.slickGoTo(currentSlide);
      }
    },
  };

  const innerCarouselSettings = {
    ...settings,
    slidesToShow: Math.min(images ? images.length : 1, 5), // Ensure it doesn't show more slides than available images
    arrows: false,
    infinite: images && images.length > 1 ? true : false, // Ensure it returns a boolean
    afterChange: (currentSlide: any) => {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(currentSlide);
      }
    },
  };

  const slideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Debounce the handleNext function
  const handleNext = debounce(() => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  }, 300); // Adjust the debounce delay (in milliseconds) as needed

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleInnerPrev = () => {
    if (innerSliderRef.current) {
      innerSliderRef.current.slickPrev();
    }
  };

  const handleInnerNext = () => {
    if (innerSliderRef.current) {
      innerSliderRef.current.slickNext();
    }
  };

  return (
    <div>
      {/* Main Carousel */}
      <div className="relative">
        <Slider {...settings} ref={sliderRef}>
          {images?.map((image, index) => (
            <motion.div
              key={index}
              className="sm:px-2 pt-2 relative rounded-t-lg overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
              variants={slideVariants}
            >
              <div className="w-full rounded-md h-72 hover:rounded-md relative group">
                <Image
                  priority
                  src={image.imageUrl}
                  alt={`Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity  w-full rounded-md hover:rounded-md duration-300"
                />
                {/* Overlay with title */}
              </div>
            </motion.div>
          ))}
        </Slider>

        {/* Custom Arrows for the Main Carousel */}
        {images && images.length > 1 && (
          <>
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 z-10"
              onClick={handlePrev}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 z-10"
              onClick={handleNext}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Inner Carousel */}
      {images && images.length > 1 && (
        <div className="relative xs:p-2">
          <Slider {...innerCarouselSettings} ref={innerSliderRef}>
            {images.map((lowerImage, lowerIndex) => (
              <div key={lowerIndex} className="max-h-[50px] w-[60px] overflow-hidden">
                <Image
                  src={lowerImage.imageUrl}
                  priority
                  alt={`Inner Research ${lowerIndex + 1}`}
                  objectFit="cover"
                  width={60}
                  height={50}
                  className="object-cover rounded-sm max-h-[50px] w-[60px] overflow-hidden"
                />
              </div>
            ))}
          </Slider>

          {/* Custom Arrows for Inner Carousel */}
          <button
            className="absolute mx-2 top-[30%] left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 z-10"
            onClick={handleInnerPrev}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-3 w-3 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            className="absolute top-[30%] right-2 mx-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 z-10"
            onClick={handleInnerNext}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-3 w-3 relative top-0 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;

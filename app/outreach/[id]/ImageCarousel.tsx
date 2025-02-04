'use client'
import React, { useRef } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Image as Picture } from '@/app/utils/types'
import { debounce } from 'lodash';



const ImageCarousel = ({ images }: { images: Picture[] | null | undefined }) => {

    const settings = {
        infinite: true,
        speed: 500,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true, 
        
      };
      const slideVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };
      

      const sliderRef = useRef<Slider | null>(null); 
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
  return (
    <div>
      <Slider {...settings} >
          {images?.map((image, index: number) => (
            <motion.div
              key={index}
              className="  sm:px-2 pt-2 relative size-[400px] rounded-t-lg overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
              variants={slideVariants}
            >
              <div className={`w-full rounded-md size-full  hover:rounded-md relative group`}>
                <Image
                  src={image.imageUrl}
                  priority
                  alt={`Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity rounded-md hover:rounded-md duration-300"
                />
                {/* Overlay with title */}
                
              </div>
            </motion.div>
          ))}
        </Slider>
       
    </div>
  )
}

export default ImageCarousel

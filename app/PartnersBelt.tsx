import React from "react";
import Image, { StaticImageData } from "next/image";

interface ImageData {
  src: StaticImageData;
  alt: string;
}

interface ImageSliderProps {
  images: ImageData[];
}

const Belt: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <div className="">
      <div className="">
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-10 sm:h-10 md:h-10 lg:h-10 "
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Belt;

"use client";
import React from "react";
import Img_9177 from "../public/IMG_9177.jpg";
import Image from "next/image";
import { motion } from "framer-motion";
import ServicesSection from "./servicesGrid";
import ResearchSection from "./ReseachSection";
import NewsSection from "./NewsSection";
import Footer from "./Footer";
import FriendShip from './assets/friendship-day-3104635_1280.jpg'
import { ChakraProvider, Container, Flex, Box } from "@chakra-ui/react";

const Main = () => {
  // Define animation variants for text content (used later)
  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  return (
    <ChakraProvider>
      <div className="relative min-h-screen bg-[#222222] text-white mb-10">
        {/* Header Section with Image Background Transition */}
        <header className="relative w-full h-[700px]">
          {/* Image Background */}
          <div className="absolute inset-0">
            <Image
              src={FriendShip}
              alt="Header Background"
              layout="fill"
              objectFit="cover"
              className="object-cover"
            />
          </div>

          {/* Soft Gray Overlay that transitions */}
          <motion.div
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(69, 69, 69, 0.8)" }}
            transition={{ duration: 3 }}
            className="absolute inset-0"
          />

          {/* Animated Header Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.9, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className=""
            > 
            <div className="shadow-lg rounded-md">
              <p className="text-[#D4AF37] text-5xl font-extrabold p-4 bg-[#433f3f] bg-opacity-50  text-center">Women Health Issues Trust Zimbabwe</p>
                <p className="text-[#D4AF37] text-5xl font-extrabold shadow-lg p-4 bg-[#433f3f] bg-opacity-50 text-center">SRHR and Harm Reduction Observatory</p>
            </div>    </motion.h1>
          </div>
        </header>

        {/* Main Content Section */}
        <Container maxW="container.xl" className="pt-20 pb-10">
          <Flex
            direction={{ base: "column", md: "row" }}
            alignItems="center"
            gap={8}
          >
            {/* Text Content */}
            <Box flex="1">
              <motion.div
                initial={{ opacity: 1, x: 50 }} // Starts from the right
                whileInView={{ opacity: 1, x: [0, -50, 0] }} // Moves left & bounces back
                transition={{ duration: 2, ease: "easeInOut" }}
                viewport={{ once: true }}
              >
                
                <p className="text-md text-[#e8edce] leading-relaxed">
                We recognize that building an equitable future necessitates forging
                unbreakable links between access to Sexual and Reproductive Health and
                Rights (SRHR), the elimination of gender-based inequities especially in the
                form of Gender Based Violence in our Communities and the need for policies
                that observes drug use as a public health concern. The observatory platform
                will host a cutting-edge data visualization and knowledge platform in order to
                champion robust policies and pioneering programs aimed at eradicating
                Gender-Based Violence from our society and the criminalization of drug use
                for our people.
                </p>
              </motion.div>
            </Box>

            {/* Animated Image Moves Left & Swaps Right */}
            
          </Flex>
        </Container>

        {/* Additional Sections */}
        <Container maxW="container.xl" className="mt-5 rounded-md">
          <ServicesSection />
          <ResearchSection />
          <NewsSection />
        </Container>

        {/* Footer */}
        <Footer />
      </div>
    </ChakraProvider>
  );
};

export default Main;

"use client";
import React from "react";
import Img_9177 from "../public/IMG_9177.jpg";
import Image from "next/image";
import { motion } from "framer-motion";
import ServicesSection from "./servicesGrid";
import ResearchSection from "./ReseachSection";
import NewsSection from "./NewsSection";
import Footer from "./Footer";
import { ChakraProvider, Container, Flex, Box } from "@chakra-ui/react";

const Main = () => {
  // Define animation variants for text content
  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  return (
    <ChakraProvider>
      <div className="relative min-h-screen bg-[#222222] text-white">
        {/* Header Section with Video Background and Overlay Text */}
        <header className="relative w-full">
          <motion.div>
            <video className="w-full h-full object-cover opacity-50" autoPlay muted loop>
              <source src="/istock_video_1618787489974_2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h1
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-[#D4AF37] text-5xl -extrabold shadow-lg p-4 bg-[#433f3f] bg-opacity-50 rounded text-center"
            >
              Sexual Reproductive Rights and Harm Reduction Observatory
            </motion.h1>
          </div>
        </header>

        {/* Main Content Section */}
        <Container maxW="container.xl" className="py-20">
  <Flex direction={{ base: "column", md: "row" }} alignItems="center" gap={8}>
    {/* Text Content */}
    <Box flex="1">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl text-[#D4AF37] font-bold mb-4">The National Drug Observatory</h1>
        <p className="text-md text-gray-200 leading-relaxed">
        A growing number of people are questioning national and international drug policies that prioritize strict law enforcement and punishment in an attempt to end the manufacture, trade, use, and cultivation of banned substances—a strategy known as the "war on drugs." The Global Drug Policy Observatory aims to advance evidence-based and human rights-based drug policies through thorough reporting, monitoring, and analysis of policy developments at both national and international levels. The project provides a platform for engaging with diverse audiences, including the press, opinion leaders, scholars, and members of law enforcement and policymaking sectors, to deepen and broaden the current policy discourse. The Observatory conducts a range of research activities, exploring not only the dynamics and implications of existing and emerging policy issues but also the processes behind policy shifts at various levels of governance.
        </p>
      </motion.div>
    </Box>

    {/* Animated Image Moves Right & Bounces Back */}
    <Box flex="1">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: [0, 50, 0] }}  // Moves right & bounces back
        transition={{ duration: 3, ease: "easeInOut" }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.10 }} // Slight hover effect
      >
        <Image
          src={Img_9177}
          alt="Logo"
          width={800}
          height={600}
          className="shadow-lg object-cover rounded"
        />
      </motion.div>
    </Box>
  </Flex>
</Container>


        {/* Additional Sections */}
        <Container maxW="container.xl" className="py-10">
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

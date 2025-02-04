'use client'
import React from "react";
import { ChakraProvider, Box, extendTheme } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import Link from "next/link";

const theme = extendTheme({
  colors: {
    primary: "#223525",
    secondary: "#e6f4ea",
    accent: "#d6edd9",
    textPrimary: "#37493c",
    textSecondary: "#244f30",
    highlight: "#0a3115",
    buttonBg: "#0a2f14",
    buttonText: "yellow-300",
    buttonHoverBg: "#deedce",
    buttonHoverText: "#051608",
  },
});

const SidePanel = () => {
  const menuItems = [
   
    {href:"/research", label:"Explore Our Research"},
    {href:"/research/working-paper", label:"Working Papers"},
    { href:"/research/drugs-used", label: "Drugs Being Used" },
    {href: "/research/research-with-us" , label:"Research With Us"}
  ];

  return (
    <ChakraProvider theme={theme}>
      <motion.div
        className="pt-28 space-y-10 pb-1 bg-primary"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        

        <Box className="bg-[#507455] top-50 mx-3 p-4 ">
          {menuItems.map((item, index) => (
            <Link key={index} href= {item.href}>
              <Box
                
                color={'white'}
                className="mb-4 p-3 bg-highlight text-secondary  cursor-pointer"
                _hover={{ bg: "buttonHoverBg", color: "buttonHoverText" }}
                fontSize={14}
                borderBottomWidth="1.5px"
                borderBottomColor="#facc15"
              >
                {item.label}
              </Box >
            </Link>
          ))}
        </Box>
      </motion.div>
    </ChakraProvider>
  );
};

export default SidePanel;

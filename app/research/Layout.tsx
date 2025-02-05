'use client'
import { ChakraProvider, Show, Box, Tab, Tabs, TabList, TabPanel, TabPanels, extendTheme } from "@chakra-ui/react";
import { ReactNode } from "react";
import { motion } from 'framer-motion';
import Link from "next/link";

const theme = extendTheme({
  colors: {
    primary: "#222222",   // Dark gray for background
    secondary: "#E8EDCE",  // Warm beige for subtle contrasts
    accent: "#D4AF37",     // Gold for highlights
    textPrimary: "#1D532D",// Deep green for text
    textSecondary: "#433F3F", // Muted brown for secondary text
    highlight: "#D47800",  // Burnt orange for active links
    buttonBg: "#D4AF37",   // Gold for button background
    buttonText: "#F3F5E7", // Light beige for button text
    buttonHoverBg: "#E8EDCE", // Hover effect with warm beige
    buttonHoverText: "#1D532D", // Hover text color in deep green
  },
});

const ResearchLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ChakraProvider theme={theme}>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Box className="bg-[#222222]  py-32">
          <Tabs variant="enclosed" colorScheme="teal ">
            <div className="px-4">
              <TabList className="flex justify-center">
                <Tab _selected={{ bg: "#505050", color: "white" }} className="font-semibold hover:font-bold text-[#f1ebd7] text-xl px-8 py-2 cursor-pointer">
                  <Link className="text-[#f1ebd7] " href="/research">Explore Our Research</Link>
                </Tab>
                <Tab _selected={{ bg: "#505050", color: "white" }} className="font-semibold hover:font-bold text-[#f1ebd7] text-xl px-8 py-2 cursor-pointer">
                  <Link className="text-[#f1ebd7] " href="/research/working-paper">Working Papers</Link>
                </Tab>
                <Tab _selected={{ bg: "#505050", color: "white" }} className="font-semibold hover:font-bold text-[#f1ebd7] text-xl px-8 py-2 cursor-pointer">
                  <Link className="text-[#f1ebd7] " href="/research/drugs-used">Drugs Being Used</Link>
                </Tab>
                <Tab _selected={{ bg: "#505050", color: "white" }} className="font-semibold hover:font-bold text-[#f1ebd7] text-xl px-8 py-2 cursor-pointer">
                  <Link className="text-[#f1ebd7] " href="/research/research-with-us">Research With Us</Link>
                </Tab>
              </TabList>
            </div>

            <TabPanels>
              <TabPanel>
                {children}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </motion.div>
    </ChakraProvider>
  );
};

export default ResearchLayout;

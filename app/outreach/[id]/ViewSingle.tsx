"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Text,
  extendTheme,
} from "@chakra-ui/react";
import { BiX } from "react-icons/bi";

import useOutreachSingle from "@/app/hooks/useOutreachSingle";
import OutreachCarousel from "../OutreachCarousel";
import ImageCarousel from "./ImageCarousel";

// Define our custom theme colors
const theme = extendTheme({
  colors: {
    primary: "#1A202C",  // Dark background
    accent: "#D4AF37",   // Gold accent
    secondary: "#E8EDCE", // Off-white/light text
  },
});

const ViewSingle = ({ id }: { id: string }) => {
  const { data: outreach } = useOutreachSingle(`/outreach`, id);

  useEffect(() => {
    if (outreach) {
      console.log(outreach);
    }
  }, [outreach]);

  const [showImage, setShowImage] = useState(false);

  return (
    <ChakraProvider theme={theme}>
      <Box pt={28} bg="primary" minH="100vh" color="secondary" px={4}>
        {/* Image Modal */}
        <Modal isOpen={showImage} onClose={() => setShowImage(false)} isCentered size="xl">
          <ModalOverlay bg="blackAlpha.700" />
          <ModalContent bg="primary" maxW="90%" maxH="90%">
            <ModalCloseButton color="accent" />
            <ModalBody p={4}>
              {outreach && outreach.images && outreach.images.length === 1 ? (
                <Image
                  src={outreach.images[0].imageUrl}
                  alt="Outreach Image"
                  width={450}
                  height={200}
                  className="rounded-md"
                />
              ) : outreach && outreach.images && outreach.images.length > 1 ? (
                <ImageCarousel images={outreach.images} />
              ) : null}
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Header / Title Section */}
        <Flex direction="column" align="center" textAlign="center" mb={10}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Heading as="h1" size="2xl" color="accent">
              {outreach?.theme}
            </Heading>
            <Text fontSize="xl" mt={2}>
              {outreach?.location}
            </Text>
            <Text fontSize="sm" mt={1}>
              {`${outreach?.From.toString().substring(0, 10)} to ${outreach?.To.toString().substring(0, 10)}`}
            </Text>
          </motion.div>
        </Flex>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Flex justify="center" mb={12}>
            <Box
              w={{ base: "90%", md: "70%" }}
              bg="secondary"
              color="primary"
              boxShadow="lg"
              rounded="lg"
              overflow="hidden"
              position="relative"
            >
              {/* Carousel (click to open image modal) */}
              <Box onClick={() => setShowImage(true)} cursor="pointer">
                <OutreachCarousel images={outreach?.images} />
              </Box>
              {/* Divider */}
              <Box h="2px" bg="primary" w="80%" mx="auto" my={2} />
              {/* Activity Details */}
              <Box p={5} bg="secondary">
                <Heading as="h2" size="md" color="primary" mb={2}>
                  ACTIVITY
                </Heading>
                <Text color="primary">{outreach?.body}</Text>
              </Box>
            </Box>
          </Flex>
        </motion.div>
      </Box>
    </ChakraProvider>
  );
};

export default ViewSingle;

"use client";
import React, { useEffect } from "react";
import useNewsSingle from "@/app/hooks/useNewsSingle";
import NextImage from "next/image";
import {
  Box,
  Container,
  Heading,
  Text,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";

// Define our custom theme with our chosen colors
const theme = extendTheme({
  colors: {
    primary: "#222222",   // Dark text for headings and content
    accent: "#D4AF37",    // Gold accent elements if needed
    secondary: "#E8EDCE", // Light background for panels/cards
    background: "#1A202C",// Overall page background
  },
});

const ViewPage: React.FC<{ id: string }> = ({ id }) => {
  const { data: news } = useNewsSingle("news", id);

  useEffect(() => {
    console.log(news?.imageUrl);
  }, [news]);

  return (
    <ChakraProvider theme={theme}>
      <Box
        pt={36}
        pb={16}
        minH="100vh"
        bg="background"
        display="flex"
        justifyContent="center"
      >
        <Container maxW="4xl">
          <Box bg="secondary" borderRadius="lg" boxShadow="lg" p={6}>
            {/* News Title */}
            <Heading as="h1" size="xl" color="primary" mb={4}>
              {news?.title}
            </Heading>

            {/* News Image */}
            {news?.imageUrl && (
              <Box
                position="relative"
                w="100%"
                h="450px"
                mb={8}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
              >
                <NextImage
                  src={news.imageUrl}
                  alt="News Image"
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
            )}

            {/* News Date */}
            <Box mt={8} px={5} textAlign="right">
              <Text fontSize="sm" color="gray.600" fontStyle="italic">
                {news?.date.toString().substring(0, 10)}
              </Text>
            </Box>

            {/* News Content */}
            <Box mt={5} px={5}>
              <Text fontSize="lg" color="primary" lineHeight="tall">
                {news?.body}
              </Text>
            </Box>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default ViewPage;

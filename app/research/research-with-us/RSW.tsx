"use client";
import React, { useState, useContext } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ChakraProvider,
  IconButton,
  Spinner,
  extendTheme,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import useDelete from "@/app/hooks/useDelete";
import ModalContext from "@/app/contexts/ModalContext";
import UserContext from "@/app/contexts/UserContext";
import RSWForm from "./RSWForm";
import { BiPlusCircle } from "react-icons/bi";
import useFormModal from "@/app/hooks/useFormModal";
import apiClient from "@/app/utils/apiClient";
import saveAs from "file-saver";
import useRSW from "@/app/hooks/useRSW";
import useDataUpdate from "@/app/hooks/useDataUpdate";
import { Toaster } from "sonner";
import { downloadFile } from "@/app/utils/uploadsupabse";

const theme = extendTheme({
  colors: {
    // Our chosen palette:
    primary: "#222222",       // Main dark background
    accent: "#D4AF37",        // Gold accent
    secondary: "#E8EDCE",     // Off-white/light gray for text/panels
  },
});

const ResearchWithUs: React.FC = () => {
  const { data, loading, error } = useRSW();
  const [researchWithUs, setResearchWithUs] =
    useDataUpdate<ResearchWithUsType[]>(data);
  const [selectedResearch, setSelectedResearch] =
    useState<ResearchWithUsType | null>(null);
  const { showModal, setShowModal } = useContext(ModalContext);
  const { user } = useContext(UserContext);
  const handleDelete = useDelete();
  const { selectedItemId, setSelectedItemId } = useFormModal();

  return (
    <div className="min-h-screen bg-secondary py-32 px-4">
      <Toaster richColors position="bottom-center" />
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent click event from closing the modal when clicking inside the form
            className="bg- rounded-lg shadow-lg max-h-[100vh] mt-4 w-[90%] sm:w-[90%] md:w-[90%] overflow-y-auto"
          >
            <RSWForm
              setResearchWithUs={setResearchWithUs}
              researchWithUs={researchWithUs}
              onClose={() => setShowModal(false)}
              id={selectedItemId?.toString()}
            />
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl text-[#D4AF37] mx-4 font-bold text-primary">
            Research With Us
          </h1>
          {user && (
            <div className="pt-2">
              <button
                className="flex items-center px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition" onClick={() => { setSelectedItemId(undefined); setShowModal(true); }}>
            <BiPlusCircle className="mr-2 text-xl" /> 
                Add
              </button>
            </div>
          )}
        </div>
        <p className="mt-4 text-lg text-[#f2f3c2]">
          Join us in our ongoing research projects. We are looking for talented
          individuals to collaborate with.
        </p>
      </div>

      <ChakraProvider theme={theme}>
        {loading && (
          <ChakraProvider>
            <div className="flex justify-center mt-5">
              <Spinner aria-busy className="text-green-500" />
            </div>
          </ChakraProvider>
        )}
        {researchWithUs?.length === 0 && !loading && (
          <div className="text-primary mt-3">No Data</div>
        )}
        {error && (
          <div className="flex space-x-3">
            <div className="text-[#d5342b] mt-3">Failed to load data</div>
            <button
              className="flex items-center px-3 py-2 rounded-md bg-yellow-400 text-primary hover:bg-opacity-60 transition-all duration-300"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        )}
        <div className="max-w-7xl mx-auto">
          <Accordion allowMultiple shadow={10} rounded={5}>
            {researchWithUs?.map((research) => (
              <AccordionItem key={research.id} border="none">
                <h2>
                  <AccordionButton
                    _expanded={{
                      bg: theme.colors.accent, // Gold when expanded
                      color: theme.colors.primary, // Text becomes dark for contrast
                    }}
                    bg={theme.colors.primary} // Dark background
                    color={theme.colors.secondary} // Light text
                    _hover={{ bg: "#333333" }}
                    fontSize={14}
                    borderBottomWidth="1px"
                    borderBottomColor={theme.colors.accent}
                    p={4}
                    onClick={() => setSelectedResearch(research)}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      {research.title}
                    </Box>
                    {user && (
                      <Box className="flex space-x-2">
                        <IconButton
                          marginRight={3}
                          aria-label="Edit"
                          icon={<EditIcon />}
                          size="sm"
                          variant="outline"
                          colorScheme="yellow"
                          onClick={(e) => {
                            setSelectedItemId(research.id);
                            e.stopPropagation();
                            setShowModal(true);
                          }}
                        />
                        <IconButton
                          aria-label="Delete"
                          icon={<DeleteIcon />}
                          size="sm"
                          variant="outline"
                          colorScheme="yellow"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(
                              "/research-with-us",
                              { id: research.id, documentUrl: research.documentUrl },
                              setResearchWithUs
                            );
                          }}
                        />
                      </Box>
                    )}
                    <AccordionIcon color={theme.colors.secondary} />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} bg="white">
                  <div className="text-primary text-lg font-bold mt-3">
                    Description
                  </div>
                  <div className="text-[15px] mt-5 text-[#777777]">
                    {research.description}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Start Date: {research.startDate.toString().substring(0, 10)} | End Date:{" "}
                    {research.endDate.toString().substring(0, 10)}
                  </div>
                  <div className="mt-4">
                    Collaborators: {research.collaborators.join(", ")}
                  </div>
                  {research.documentUrl && (
                    <div className="mt-4">
                      <a
                        onClick={async () => {
                          await downloadFile(research.documentUrl);
                        }}
                        className="text-blue-500 hover:underline cursor-pointer"
                      >
                        Download
                      </a>
                    </div>
                  )}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ChakraProvider>
    </div>
  );
};

export default ResearchWithUs;

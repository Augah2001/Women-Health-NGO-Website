"use client";
import React, { useContext } from "react";
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
import useWorkingPaper from "@/app/hooks/useWorkingPaper";
import apiClient from "@/app/utils/apiClient";
import saveAs from "file-saver";
import { WorkingPaper } from "@/app/utils/types";
import WPForm from "@/app/research/working-paper/WPForm";
import { Toaster } from "sonner";
import useDataUpdate from "@/app/hooks/useDataUpdate";
import useDelete from "@/app/hooks/useDelete";
import useFormModal from "@/app/hooks/useFormModal";
import ModalContext from "@/app/contexts/ModalContext";
import { BiPlusCircle } from "react-icons/bi";
import UserContext from "@/app/contexts/UserContext";
import { downloadFile } from "@/app/utils/uploadsupabse";

const theme = extendTheme({
  colors: {
    primary: "#222222",    // Dark background
    accent: "#D4AF37",     // Gold accent
    secondary: "#E8EDCE",  // Light panel/text color
  },
});

const Accord = () => {
  const handleDownload = async (workingPaper: WorkingPaper) => {
    try {
      const response = await apiClient.get(
        `/document/${workingPaper.documentUrl}`,
        { responseType: "blob" }
      );
      saveAs(response.data, `${workingPaper.title}.pdf`);
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  const handleDelete = useDelete();
  const { data: workingPapers, loading, error } = useWorkingPaper();
  const [workingPapersData, setWorkingPaperData] =
    useDataUpdate<WorkingPaper[]>(workingPapers);
  const { selectedItemId, setSelectedItemId } = useFormModal();
  const { showModal, setShowModal } = useContext(ModalContext);
  const { user } = useContext(UserContext);

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <Toaster richColors position="bottom-center" />

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-[#302f2f] bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-secondary rounded-lg shadow-lg max-h-[100vh] mt-4 w-[90%] sm:w-[90%] md:w-[90%] overflow-y-auto"
          >
            <WPForm
              workingPapers={workingPapersData}
              setWorkingPapers={setWorkingPaperData}
              id={selectedItemId?.toString()}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center pt-10 mb-8 pb-0 px-5 bg-primary">
        <div className="text-4xl flex mx-auto text-[#D4AF37] font-bold  mb-7">
          Working Papers
        </div>
        {user && (
          <div className="pt-2">
            <button
               className="flex items-center px-3 py-2 rounded-md bg-[#D4AF37] text-[#222222] hover:bg-[#D47800] transition-all duration-300"onClick={() => {
                setSelectedItemId(undefined);
                setShowModal(true);
              }}
            >
              <BiPlusCircle className="mr-2 text-xl" />
              Add
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="mx-10">
        {loading && (
          <ChakraProvider>
            <div className="flex justify-center mt-5">
              <Spinner size={'xl'} aria-busy speed="0.6s" color={theme.colors.accent} />
            </div>
          </ChakraProvider>
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

        <ChakraProvider theme={theme}>
          <Accordion allowMultiple shadow={10} rounded={5}>
            {workingPapersData?.map((w, index) => (
              <div key={index} className="rounded-md w-full">
                <AccordionItem border="none">
                  <h2>
                    <AccordionButton
                      _expanded={{
                        bg: theme.colors.accent,
                        color: theme.colors.primary,
                      }}
                      color={theme.colors.secondary}
                      _hover={{ bg: "#333333" }}
                      fontSize={14}
                      borderBottomWidth="1px"
                      borderBottomColor="#D4AF37"
                      p={4}
                    >
                      <Box as="span" marginRight={5}>
                        {w.date.toString().substring(0, 10)}
                      </Box>
                      <Box as="span" flex="1" textAlign="left">
                        {w.title}
                      </Box>
                      {user && (
                        <Box className="flex space-x-2">
                          <IconButton
                            aria-label="Edit"
                            icon={<EditIcon />}
                            size="sm"
                            mt={1}
                            mx={1}
                            variant="outline"
                            borderColor={theme.colors.accent}
                            color={theme.colors.accent}
                            _hover={{
                              bg: "transparent",
                              color: theme.colors.accent,
                              borderColor: theme.colors.accent,
                            }}
                            onClick={(e) => {
                              setSelectedItemId(w.id);
                              e.stopPropagation();
                              setShowModal(true);
                            }}
                          />
                          <IconButton
                            aria-label="Delete"
                            icon={<DeleteIcon />}
                            size="sm"
                            mt={1}
                            mx={1}
                            variant="outline"
                            borderColor={theme.colors.accent}
                            color={theme.colors.accent}
                            _hover={{
                              bg: "transparent",
                              color: theme.colors.accent,
                              borderColor: theme.colors.accent,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(
                                "/working-paper",
                                { id: w.id, documentUrl: w.documentUrl },
                                setWorkingPaperData
                              );
                            }}
                          />
                        </Box>
                      )}
                      <AccordionIcon color={theme.colors.secondary} />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} bg={theme.colors.secondary}>
                    <div className="text-primary text-lg font-bold mt-3">
                      ABSTRACT
                    </div>
                    <div className="text-[15px] mt-5 text-[#777777]">
                      {w.abstract}
                    </div>
                    <div className="flex justify-center">
                      <div className="h-[1px] w-[80%] bg-primary mt-8"></div>
                    </div>
                    <div className="flex justify-center mt-2">
                      <button
                        className="bg-primary hover:bg-accent hover:text-primary active:scale-105 transform transition-all ease-in-out duration-400 text-accent px-4 py-2 mt-4 rounded-full"
                        disabled={typeof w?.documentUrl !== "string"}
                        onClick={async () => {
                          await downloadFile(w?.documentUrl);
                        }}
                      >
                        Download PDF
                      </button>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </ChakraProvider>
      </div>
    </motion.div>
  );
};

export default Accord;

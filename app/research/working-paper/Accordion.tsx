"use client";
import React, { useContext, useEffect, useState } from "react";
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
import { Toaster, toast } from "sonner";
import useDataUpdate from "@/app/hooks/useDataUpdate";
import useDelete from "@/app/hooks/useDelete";
import useFormModal from "@/app/hooks/useFormModal";
import ModalContext from "@/app/contexts/ModalContext";
import { BiPlusCircle } from "react-icons/bi";
import UserContext from "@/app/contexts/UserContext";
import { downloadFile } from "@/app/utils/uploadsupabse";

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

const Accord = () => {
  const handleDownload = async (workingPaper: WorkingPaper) => {
    try {
      const response = await apiClient.get(
        `/document/${workingPaper.documentUrl}`,
        {
          responseType: "blob",
        }
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
      className=""
    >
      <Toaster richColors position="bottom-center" />
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent click event from closing the modal when clicking inside the form
            className="bg-white rounded-lg shadow-lg md:max-h-[100vh] xs:max-h-[100vh] xs:top-8 mt-4 w-[90%] sm:w-[90%] md:w-[90%] overflow-y-auto "
          >
            {
              <WPForm
                workingPapers={workingPapersData}
                setWorkingPapers={setWorkingPaperData}
                id={selectedItemId?.toString()}
                onClose={() => setShowModal(false)}
              />
            }
          </div>
        </div>
      )}

      <div className="flex justify-between pt-28 mb-14  pb-10 px-5 bg-[#223525]">
        <div className="text-4xl  text-[#e6f4ea] font-normal mb-7">
          Working Paper Series
        </div>
        {user && (
          <div className=" pt-2">
            <button
              className="flex items-center hover:text-[#051608]  px-3 py-2 rounded-md hover:bg-[#deedce]  text-[#051608] bg-[#dfe4da] transition-all duration-300"
              onClick={() => {
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
      <div className="bg-primary top-50 mx-10">
      { loading && (
          <ChakraProvider>
            <div className="flex justify-center mt-5">
              <Spinner aria-busy  speed = '0.6s' className="text-green-500" />
            </div>
          </ChakraProvider>
        )}
       
       {error && (
          <div className="flex space-x-3">
            <div className="text-[#d5342b] mt-3">Failed to load data</div>
            <button className="flex items-center hover:text-[#051608]  
            px-3 py-2 rounded-md hover:bg-opacity-60  
            text-[#051608] bg-yellow-400 transition-all duration-300"
            onClick={() =>window.location.reload()}
            >reload</button>
          </div>
        )}
        <ChakraProvider theme={theme}>
          <Accordion allowMultiple shadow={10} rounded={5}>
            {workingPapersData?.map((w, index) => (
              <div key={index} className="rounded-md w-full">
                <AccordionItem border="none">
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "#507455", color: "secondary" }}
                      bg="#223525"
                      color="secondary"
                      _hover={{ bg: "#accent" }}
                      fontSize={14}
                      borderBottomWidth={"1px"}
                      borderBottomColor={"#facc15"}
                      p={4}
                    >
                      <Box as="span" marginRight={5}>
                        {w.date.toString().substring(0, 10)}
                      </Box>
                      <Box as="span" flex="1" textAlign="left">
                        {w.title}
                      </Box>
                      {user && (
                        <Box>
                          <Box marginRight={3}  >
                            <IconButton
                              aria-label="Edit"
                              icon={<EditIcon />}
                              size="sm"
                              marginTop={1}
                              marginX={1}
                              variant="outline"
                              colorScheme="yellow"
                              onClick={(e) => {
                                setSelectedItemId(w.id);
                                e.stopPropagation();
                                setShowModal(true);
                              }}
                            />
                          </Box>
                          <Box marginRight={3}>
                            <IconButton
                            marginTop={1}
                            marginX={1}
                              aria-label="Delete"
                              icon={<DeleteIcon />}
                              size="sm"
                              variant="outline"
                              colorScheme="red"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(
                                  "/working-paper",
                                  {id:w.id, documentUrl: w.documentUrl},
                                  setWorkingPaperData
                                );
                              }}
                            />
                          </Box>
                        </Box>
                      )}
                      <AccordionIcon color={"#e6f4ea"} />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} bg="white">
                    <div className="text-[#37493c] text-lg font-bold mt-3">
                      ABSTRACT
                    </div>
                    <div className="text-[15px] mt-5 text-[#536859]">
                      {w.abstract}
                    </div>
                    <div className="flex justify-center">
                      <div className="h-[1px] w-[80%] bg-[#37493c] mt-8"></div>
                    </div>
                    <div className="flex justify-center mt-2">
                      <button
                        className="bg-[#223525] hover:bg-yellow-400 hover:text-[#223525] active:scale-105 transform transition-all ease-in-out duration-400 text-yellow-300 px-4 py-2 mt-4"
                        disabled={typeof w?.documentUrl !== 'string'}
                        onClick={async()=> {
                          
                          await downloadFile(w?.documentUrl)}}
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

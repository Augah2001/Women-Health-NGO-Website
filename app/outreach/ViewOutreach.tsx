"use client";
import { motion } from "framer-motion";
import OutreachCarousel from "./OutreachCarousel";
import usePeerOutreach from "../hooks/usePeerOutreach";
import { useRouter } from "next/navigation";
import { BiPlusCircle } from "react-icons/bi";
import ModalContext from "../contexts/ModalContext";
import { useContext } from "react";
import useFormModal from "../hooks/useFormModal";
import OutreachForm from "./OutreachForm";
import useDataUpdate from "../hooks/useDataUpdate";

import { ChakraProvider, IconButton, Spinner } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import useDelete from "../hooks/useDelete";
import { PeerOutreach } from "../utils/types";
import UserContext from "../contexts/UserContext";
import { Toaster } from "sonner";

const ViewOutreach = () => {
  const { data: outreach, loading, error } = usePeerOutreach();
  const { setShowModal, showModal } = useContext(ModalContext);
  const { setSelectedItemId, selectedItemId } = useFormModal();
  const [outreachItems, setOutreachData] =
    useDataUpdate<PeerOutreach[]>(outreach);

  const router = useRouter();

  const { user } = useContext(UserContext);

  const handleDelete = useDelete();

  return (
    <div className="pt-28 space-y-10 pb-10 bg-[#223525]">
      <Toaster richColors position="bottom-center" />
      <motion.h1
        className="flex justify-between mb-12 px-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        {showModal && (
          <div
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-lg md:max-h-[100vh] xs:max-h-[100vh] xs:top-8 mt-4 xs:w-[96%] sm:w-[90%] md:w-[90%] overflow-y-auto "
            >
              <OutreachForm
                outreachItems={outreachItems}
                setOutreachItems={setOutreachData}
                id={selectedItemId?.toString()}
                onClose={() => setShowModal(false)}
              />
            </div>
          </div>
        )}
        <div className="text-4xl text-[#e6f4ea] font-normal">Peer Outreach</div>
        {user && (
          <div className="mb-5 pt-2">
            <button
              className="flex items-center hover:text-[#051608] px-3 py-2 rounded-md hover:bg-[#deedce] text-[#051608] bg-[#dfe4da] transition-all duration-300"
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
      </motion.h1>
      <div className="absolute top-40 md:w-[800px] xs:w-[370px] lg:w-[1000px] pe-5 xl:w-[1200px] xs:mx-5 mx-10">
        <div className="mt-20 flex justify-center">
        { loading && (
          <ChakraProvider>
            <div className="flex justify-center mt-12">
              <Spinner aria-busy speed="0.60s" className="text-green-500" />
            </div>
          </ChakraProvider>
        )}
        {outreachItems?.length == 0 && loading == false && (
          <div className="text-[#051608] mt-12">No Outreach Data</div>
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
        </div>
     
        {outreachItems?.map((o) => (
          <div key={o.id} className="shadow-xl mb-10">
            <div className="flex justify-between items-center bg-[#e6f4ea] rounded-t-md p-4">
              <div className="xs:px-2 sm:px-5 border-[1.5px] bg-[#d6edd9] rounded-md border-[#637467] flex justify-center items-center text-[#37493c]">
                {`${o.From.toString().substring(
                  0,
                  10
                )} to  ${o.To.toString().substring(0, 10)}`}
              </div>
              {user && (
                <ChakraProvider>
                  <div className="flex space-x-2">
                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      size="sm"
                      variant="outline"
                      colorScheme="yellow"
                      onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                      ) => {
                        setSelectedItemId(o.id);
                        e.stopPropagation();
                        setShowModal(true);
                      }}
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      size="sm"
                      variant="outline"
                      colorScheme="red"
                      onClick={() =>
                        handleDelete("/outreach", {id:o.id, images: o.images}, setOutreachData)
                      }
                    />
                  </div>
                </ChakraProvider>
              )}
            </div>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 rounded-b-lg py-5 bg-[#c7e2ca]">
              <div>
                <div className="space-y-3 h-full px-4">
                  <div className="text-2xl text-[#0a3115]">
                    <p className="text-[16px] font-semibold">Theme:</p>
                    <p className="text-[16px] font-light text-[#244f30]">
                      {o.theme}
                    </p>
                  </div>
                  <div className="text-2xl text-[#0a3115]">
                    <p className="text-[16px] font-semibold">Venue:</p>
                    <p className="text-[16px] font-light text-[#244f30]">
                      {o.location}
                    </p>
                  </div>
                  <div className="text-2xl text-[#0a3115]">
                    <p className="text-[16px] font-semibold">Description:</p>
                    <p className="text-[16px] font-light text-[#244f30]">
                      {o.description}
                    </p>
                  </div>
                  <div className="relative text-[#0a3115]">
                    <button
                      onClick={() => router.push(`/outreach/${o.id}`)}
                      className="bg-[#0a2f14] top-6 text-sm rounded-md text-yellow-300 px-3 
         h-10 hover:bg-[#deedce] 
         hover:text-[#051608] border-[1.5px] border-[#0a2f14] transition-all duration-500 ease-in-out"
                    >
                      More
                    </button>
                  </div>
                </div>
              </div>
              <OutreachCarousel images={o.images} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewOutreach;

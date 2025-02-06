'use client';
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
    <div className="pt-28 space-y-10 pb-10 bg-[#2c2c2c]">
      <Toaster richColors position="bottom-center" />

      {/* Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-lg md:max-h-[100vh] xs:max-h-[100vh] xs:top-8 mt-4 xs:w-[96%] sm:w-[90%] md:w-[90%] overflow-y-auto"
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

      {/* Header */}
      <motion.h1
        className="flex justify-between items-center mb-12 px-5 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="text-4xl text-[#E8EDCE] font-bold">Peer Outreach</div>
        {user && (
          <div className="mb-5 pt-2">
            <button
              className="flex items-center px-3 py-2 rounded-md bg-[#D4AF37] text-[#222222] border border-[#D4AF37] transition-all duration-300 hover:bg-transparent hover:text-[#D4AF37]"
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

      {/* Content Container */}
      <div className="absolute top-40 md:w-[800px] xs:w-[370px] lg:w-[1000px] xl:w-[1200px] xs:mx-5 mx-10">
        <div className="mt-20 flex justify-center">
          {loading && (
            <ChakraProvider>
              <div className="flex justify-center mt-12">
                <Spinner aria-busy speed="0.6s" className="text-green-500" />
              </div>
            </ChakraProvider>
          )}
          {outreachItems?.length === 0 && !loading && (
            <div className="text-[#222222] mt-12">No Outreach Data</div>
          )}
          {error && (
            <div className="flex space-x-3">
              <div className="text-[#d5342b] mt-3">Failed to load data</div>
              <button
                className="flex items-center px-3 py-2 rounded-md bg-yellow-400 text-[#222222] transition-all duration-300 hover:bg-opacity-60"
                onClick={() => window.location.reload()}
              >
                Reload
              </button>
            </div>
          )}
        </div>

        {/* Outreach Items */}
        {outreachItems?.map((o) => (
          <div key={o.id} className="shadow-xl mb-10">
            {/* Outreach Item Header */}
            <div className="flex justify-between items-center bg-[#E8EDCE] rounded-t-md p-4">
              <div className="xs:px-2 sm:px-5 border-2 bg-[#E8EDCE] rounded-md border-[#D4AF37] flex justify-center items-center text-[#222222]">
                {`${o.From.toString().substring(0, 10)} to ${o.To.toString().substring(0, 10)}`}
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
                      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
                        handleDelete("/outreach", { id: o.id, images: o.images }, setOutreachData)
                      }
                    />
                  </div>
                </ChakraProvider>
              )}
            </div>

            {/* Outreach Item Details */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 rounded-b-lg py-5 bg-[#E8EDCE]">
              <div>
                <div className="space-y-3 h-full px-4">
                  <div className="text-xl text-[#222222]">
                    <p className="text-[16px] font-semibold">Theme:</p>
                    <p className="text-[16px] font-light"> {o.theme} </p>
                  </div>
                  <div className="text-xl text-[#222222]">
                    <p className="text-[16px] font-semibold">Venue:</p>
                    <p className="text-[16px] font-light"> {o.location} </p>
                  </div>
                  <div className="text-xl text-[#222222]">
                    <p className="text-[16px] font-semibold">Description:</p>
                    <p className="text-[16px] font-light"> {o.description} </p>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => router.push(`/outreach/${o.id}`)}
                      className="bg-[#D4AF37] text-[#222222] text-sm rounded-md px-3 h-10 border border-[#D4AF37] transition-all duration-500 hover:bg-transparent hover:text-[#D4AF37]"
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

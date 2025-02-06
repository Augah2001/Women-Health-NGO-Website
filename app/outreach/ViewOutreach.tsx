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
  const [outreachItems, setOutreachData] = useDataUpdate<PeerOutreach[]>(outreach);
  const router = useRouter();
  const { user } = useContext(UserContext);
  const handleDelete = useDelete();

  return (
    <div className="pt-28 pb-16 min-h-screen bg-gray-900 text-white px-6">
      <Toaster richColors position="bottom-center" />

      {/* Modal */}
      {showModal && (
        <div onClick={() => setShowModal(false)} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div onClick={(e) => e.stopPropagation()} className="bg-gray-800 rounded-lg shadow-lg w-[90%] md:w-[50%] p-6">
            <OutreachForm outreachItems={outreachItems} setOutreachItems={setOutreachData} id={selectedItemId?.toString()} onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {/* Header */}
      <motion.div className="flex justify-between items-center mb-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-3xl font-bold text-yellow-400">Peer Outreach</h1>
        {user && (
          <button className="flex items-center px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition" onClick={() => { setSelectedItemId(undefined); setShowModal(true); }}>
            <BiPlusCircle className="mr-2 text-xl" /> Add Outreach
          </button>
        )}
      </motion.div>

      {/* Content */}
      {loading && (
        <div className="flex justify-center py-10">
          <ChakraProvider>
            <Spinner speed="0.6s" size="xl" color="yellow.400" />
          </ChakraProvider>
        </div>
      )}

      {error && (
        <div className="text-red-500 flex justify-center py-10">
          <p>Failed to load data</p>
        </div>
      )}

      {outreachItems?.length === 0 && !loading && (
        <div className="text-gray-400 text-center py-10">No Outreach Data Available</div>
      )}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {outreachItems?.map((o) => (
          <div key={o.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <span className="text-yellow-400 font-semibold">{`${o.From.toString().substring(0, 10)} - ${o.To.toString().substring(0, 10)}`}</span>
              {user && (
                <ChakraProvider>
                  <div className="flex space-x-2">
                    <IconButton aria-label="Edit" icon={<EditIcon />} size="sm" variant="outline" colorScheme="yellow" onClick={() => { setSelectedItemId(o.id); setShowModal(true); }} />
                    <IconButton aria-label="Delete" icon={<DeleteIcon />} size="sm" variant="outline" colorScheme="red" onClick={() => handleDelete("/outreach", { id: o.id, images: o.images }, setOutreachData)} />
                  </div>
                </ChakraProvider>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-lg font-bold text-yellow-300">{o.theme}</h2>
              <p className="text-sm text-gray-300">📍 {o.location}</p>
              <p className="mt-2 text-sm text-gray-400">{o.description}</p>
              <button onClick={() => router.push(`/outreach/${o.id}`)} className="mt-4 w-full py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition">More Details</button>
            </div>
            <OutreachCarousel images={o.images} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewOutreach;
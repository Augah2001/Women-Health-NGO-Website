"use client";

import { useContext, useEffect, useState } from "react";
import Joi from "joi";

import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import FormTemplate from "../../Components/FormTemplate";
import apiClient from "@/app/utils/apiClient";
import { BiX } from "react-icons/bi";
import useFetchInitial from "@/app/hooks/useFetchInitial";
import { WorkingPaper } from "@prisma/client";
import ModalContext from "@/app/contexts/ModalContext";
import { deleteFile, uploadFile } from "@/app/utils/uploadsupabse";

type WorkingPaperWithFiles = Pick<WorkingPaper, "title" | "abstract"> & {
  document?: File[];
  documentUrl?: string;
};

interface Props {
  onClose: () => void;
  id?: string | undefined;
  workingPapers: WorkingPaper[] | null | undefined;
  setWorkingPapers: React.Dispatch<
    React.SetStateAction<WorkingPaper[] | null | undefined>
  >;
}

const WorkingPaperForm = ({
  onClose,
  id,
  workingPapers,
  setWorkingPapers,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const [workingPaperData, setWorkingPaperData] =
    useState<WorkingPaperWithFiles>({
      title: "",
      abstract: "",
      document: [],
    });

  const { data } = useFetchInitial<WorkingPaper>({
    endpoint: "/working-paper",
    id: id,
  });

  useEffect(() => {
    if (data) {
      const { abstract, title, documentUrl } = data;
      setWorkingPaperData({
        abstract,
        title,
        documentUrl: documentUrl,
      });
    }
  }, [data]);

  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    abstract: Joi.string().required().label("Abstract"),
    document: Joi.any().label("Document"),
    documentUrl: Joi.string().label("DocumentUrl"),
  });
  const {setShowModal } = useContext(ModalContext);

  const doSubmit = async () => {
    try {
      setIsLoading(true);
  
      const formData = new FormData();
      formData.append("title", workingPaperData.title);
      formData.append("abstract", workingPaperData.abstract);
      formData.append("date", new Date().toISOString());
  
      let documentUrl = workingPaperData.documentUrl; // Keep existing document URL
  
      // If a new document is provided, upload it to storage
      if (workingPaperData.document && workingPaperData.document.length > 0) {
        const newDocument = workingPaperData.document[0];
  
        // If updating, delete the old document first
        if (workingPaperData.documentUrl) {
          await deleteFile(workingPaperData.documentUrl);
        }
  
        // Upload the new document and get its URL
         
        const result  = await uploadFile(newDocument);
        if (result) {
          documentUrl = result;
          formData.append("documentUrl", documentUrl);
        }
      }
  
      
  
      // Determine if we are doing a POST or PUT request
      if (workingPaperData.documentUrl) {
        formData.append("documentUrl", workingPaperData.documentUrl);
  
        // PUT request (update existing record)
        const response = await apiClient.put<WorkingPaper>(
          `/working-paper/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        // Update the state for the updated working paper
        const updatedWorkingPapers = workingPapers?.map((wp) =>
          wp.id === response.data.id ? response.data : wp
        );
        setWorkingPapers(updatedWorkingPapers);
        toast.success(`Working Paper updated successfully`);
        console.log(response.data);
  
        setTimeout(() => {
          setShowModal(false);
        }, 1000);
      } else {
        // POST request (create new record)
        if (workingPaperData.document && workingPaperData.document.length > 0) {
          const response = await apiClient.post("/working-paper", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
  
          toast.success(`Working Paper added successfully`);
          console.log(response.data);
  
          let newWorkingPapers;
          if (workingPapers) {
            newWorkingPapers = [response.data, ...workingPapers];
            setWorkingPapers(newWorkingPapers);
          }
  
          setTimeout(() => {
            setShowModal(false);
          }, 1000);
        } else {
          console.error("Invalid document data. Please select a valid document file.");
          toast.error("Invalid document data. Please select a valid document file.");
        }
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage = (typeof error.response?.data?.error === 'string' && error.response?.data?.error) || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" sm:mx-4 mb-8 rounded-md">
      <Toaster richColors position="bottom-center" />
      <FormTemplate
        schema={schema}
        doSubmit={doSubmit}
        data={workingPaperData}
        setData={setWorkingPaperData}
      >
        {(
          renderInput,
          renderPasswordInput,
          renderButton,
          renderMarkdown,
          renderFileUpload
        ) => (
          <div>
            <div
              className=" text-2xl text-[#0c361d] flex justify-end "
              onClick={onClose}
            >
              <BiX />
            </div>
            <div>
              <h1 className="text-gray-900 text-4xl font-normal mb-4">
                Working Paper
              </h1>
              <div className="">
                <div className="pt-[1px]">
                  {renderInput("title", "Title", "text")}
                </div>
                <div className="mt-4">
                  {renderFileUpload("document", "Document", ".pdf", false)}
                </div>
              </div>
              <div className="pt-4">
                {renderMarkdown("abstract", "Abstract")}
              </div>
              {renderButton("Submit", isLoading)}
            </div>
          </div>
        )}
      </FormTemplate>
    </div>
  );
};

export default WorkingPaperForm;

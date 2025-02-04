"use client";

import { useContext, useEffect, useState } from "react";
import Joi from "joi";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import FormTemplate from "../../Components/FormTemplate";
import apiClient from "@/app/utils/apiClient";
import { BiX } from "react-icons/bi";
import useFetchInitial from "@/app/hooks/useFetchInitial";
import ModalContext from "@/app/contexts/ModalContext";
import { ResearchWithUs } from "@prisma/client";
import { deleteFile, uploadFile } from "@/app/utils/uploadsupabse";
import { result } from "lodash";

type ResearchWithUsWithFiles = Pick<ResearchWithUs, "title" | "description" | "collaborators"> & {
  document?: File[];
  documentUrl?: string;
  startDate: string,
  endDate: string
};

interface Props {
  onClose: () => void;
  id?: string | undefined;
  researchWithUs: ResearchWithUs[] | null | undefined;
  setResearchWithUs: any

}

const ResearchWithUsForm = ({
  onClose,
  id,
  researchWithUs,
  setResearchWithUs,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const [researchData, setResearchData] =
    useState<ResearchWithUsWithFiles>({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      collaborators: [],
      document: [],
    });

  const { data } = useFetchInitial<ResearchWithUs>({
    endpoint: "/research-with-us",
    id: id,
  });

  useEffect(() => {
    if (data) {
      const { title, description, startDate, endDate, collaborators, documentUrl } = data;
   
      setResearchData({
        title,
        description,
        startDate: new Date(startDate).toISOString().split('T')[0],
        endDate: new Date(endDate).toISOString().split('T')[0],
        collaborators: collaborators,
        documentUrl: documentUrl,
      });
    }
  }, [data]);

  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    startDate: Joi.date().iso().required().label("Start Date"),
    endDate: Joi.date().iso().required().label("End Date"),
    collaborators: Joi.any(),
    document: Joi.any().label("Document"),
    documentUrl: Joi.string().label("DocumentUrl"),
  });

  const { setShowModal } = useContext(ModalContext);

  const doSubmit = async () => {
    try {
      setIsLoading(true);
  
      const formData = new FormData();
      formData.append("title", researchData.title);
      formData.append("description", researchData.description);
      formData.append("startDate", researchData.startDate);
      formData.append("endDate", researchData.endDate);
      formData.append("collaborators", JSON.stringify(researchData.collaborators));
  
      // Handle document upload or update
      let documentUrl = researchData.documentUrl; // Keep existing URL if no new file is provided
  
      // If a new document is provided, upload it to storage
      if (researchData.document && researchData.document.length > 0) {
        const newDocument = researchData.document[0];
  
        // If this is an update and an old document exists, delete the old one
        if (researchData.documentUrl) {
          await deleteFile(researchData.documentUrl);
        }
  
        // Upload the new document and get its URL
        const result = await uploadFile(newDocument);
        if (result) {documentUrl = result;
        formData.append("documentUrl", result);}
      }
  
      
  
      // Determine if we are doing a POST or PUT request
      if (researchData.documentUrl) {
        formData.append("documentId", researchData.documentUrl);
  
        // PUT request (update existing record)
        const response = await apiClient.put<ResearchWithUs>(
          `/research-with-us/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        // Update the state for the updated research entry
        const updatedResearchWithUs = researchWithUs?.map((research) =>
          research.id === response.data.id ? response.data : research
        );
        setResearchWithUs(updatedResearchWithUs);
        toast.success(`Research With Us updated successfully`);
  
        setTimeout(() => {
          setShowModal(false);
        }, 1000);
      } else {
        // POST request (create new record)
        const response = await apiClient.post("/research-with-us", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        toast.success(`Research With Us added successfully`);
  
        let newResearchWithUs;
        if (researchWithUs) {
          newResearchWithUs = [response.data, ...researchWithUs];
          setResearchWithUs(newResearchWithUs);
        }
        setTimeout(() => {
          setShowModal(false);
        }, 1000);
      }
    } catch (error: any) {
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
        data={researchData}
        setData={setResearchData}
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
                Research With Us
              </h1>
              <div className="">
                <div className="pt-[1px]">
                  {renderInput("title", "Title", "text")}
                </div>
                <div className="mt-4">
                  {renderInput("startDate", "Start Date", "date")}
                </div>
                <div className="mt-4">
                  {renderInput("endDate", "End Date", "date")}
                </div>
                <div className="mt-4">
                  {renderInput("collaborators", "Collaborators (comma-separated)", "text")}
                </div>
                <div className="mt-4">
                  {renderFileUpload("document", "Document", ".pdf", false)}
                </div>
              </div>
              <div className="pt-4">
                {renderMarkdown("description", "Description")}
              </div>
              {renderButton("Submit",isLoading)}
            </div>
          </div>
        )}
      </FormTemplate>
    </div>
  );
};

export default ResearchWithUsForm;

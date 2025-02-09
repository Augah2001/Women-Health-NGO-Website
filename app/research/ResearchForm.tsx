"use client";

import { useState, useEffect, useContext } from "react";
import Joi from "joi";
import FormTemplate from "../Components/FormTemplate";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import apiClient from "../utils/apiClient";
import { Research } from "@/app/utils/types";
import { BiX } from "react-icons/bi";
import ModalContext from "@/app/contexts/ModalContext";
import Compress from 'react-image-file-resizer'
import { deleteFile, extractFilePathFromUrl, uploadFile } from "../utils/uploadsupabse";
import { compressImage } from "../utils/compressImage";

interface ResearchData {
  id?: number;
  publicationDate: string;
  title: string;
  abstract: string;
  author: string;
  image: File[] | null;
  imageUrl?: string
  document: File[] | null;
  documentUrl?: string;
}

interface Props {
  id?: string;
  onClose: () => void;
  researchItems: Research[] | null;
  setResearchItems: React.Dispatch<React.SetStateAction<any>>;
}

const ResearchForm: React.FC<Props> = ({
  id,
  onClose,
  researchItems,
  setResearchItems,
}) => {
  const { setShowModal } = useContext(ModalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [researchData, setResearchData] = useState<ResearchData>({
    publicationDate: "",
    title: "",
    abstract: "",
    author: "",
    image: null,
    document: null,
  });


  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const { data } = await apiClient.get<ResearchData>(`/research/${id}`);
          setResearchData({
            publicationDate: data.publicationDate,
            title: data.title,
            abstract: data.abstract,
            author: data.author,
            image: null, // Assuming you'll set this via file input
            document: null, // Assuming you'll set this via file input
            documentUrl: data.documentUrl,
            imageUrl: data.imageUrl,
          });
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [id]);

  const schema = Joi.object({
    publicationDate: Joi.date().required().label("Date"),
    title: Joi.string().max(130).required().label("Title"),
    abstract: Joi.string().required().label("Abstract"),
    author: Joi.string().required().label("Author"),
    image: Joi.any().label("Image"),
    imageUrl: Joi.string().label("ImageUrl"),
    document: Joi.any().label("Document"),
    documentUrl: Joi.string().label("DocumentUrl"),
  });
  const doSubmit = async () => {
    try {
      setIsLoading(true); // Start loading state
  
      console.log(researchData)
      const formData = new FormData();
      formData.append("publicationDate", new Date(researchData.publicationDate).toISOString());
      formData.append("title", researchData.title);
      formData.append("abstract", researchData.abstract);
      formData.append("author", researchData.author);
  
      // Step 1: Handle Image
      if (researchData.image && researchData.image[0]) {
        // If there's an image URL, delete the existing image first
        if (researchData.imageUrl) {
          
          await deleteFile(researchData.imageUrl);
          console.log("Deleted existing image");
          
        }
  
        // Upload new image
        const compressedImage: any = await compressImage(researchData.image[0]);
        
        const newImageUrl = await uploadFile(compressedImage);
        if (!newImageUrl) throw new Error("Failed to upload image");
        formData.append("imageUrl", newImageUrl);
      }
  
      // Step 2: Handle Document
      if (researchData.document?.[0]) {
        // If there's an existing document, delete it first
        if (researchData.documentUrl) {
         
          deleteFile(researchData.documentUrl);
        }
  
        // Upload new document
        const newDocumentUrl = await uploadFile(researchData.document[0]);
        if (!newDocumentUrl) throw new Error("Failed to upload document");
        formData.append("documentUrl", newDocumentUrl);
      }
  
      // Determine if it's an update (PUT) or new submission (POST)
      const endpoint = id ? `/research/${id}` : "/research";
      const method = id ? "put" : "post";
  
      // Step 3: Send request to the API
      const response = await apiClient[method]<ResearchData>(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
   
  
      // Step 4: Update state with new or updated research item
      if (id) {
        const updatedResearchItems = researchItems?.map((item) =>
          (item.id === response.data.id) ? response.data : item
        );
        setResearchItems(updatedResearchItems || []);
      } else {
        setResearchItems([response.data, ...(researchItems || [])]);
      }
  
      toast.success("Research saved successfully");
      setTimeout(() => setShowModal(false), 1000);
    } catch (error: any) {
      console.error("Submission error:", error);
      const errorMessage = (typeof error.response?.data?.error === 'string' && error.response?.data?.error) || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false); // End loading state
    }
  };
  
  
  

  return (
    <div className="sm:mx-4 mb-8 rounded-md">
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
              className=" text-2xl text-yellow-400 flex justify-end "
              onClick={onClose}
            >
              <BiX className="text-yellow-400"/>
            </div>
            <div>
              <h1 className="text-[#D4AF37] text-4xl font-normal mb-4">
                Research
              </h1>
              <div>
                <div className="md:flex gap-4">
                  <div className="md:w-[40%]">
                    {renderInput("publicationDate", "Publication Date", "date")}
                  </div>
                  <div className="md:w-[40%] pt-[1px]">
                    {renderInput("author", "Author", "text")}
                  </div>
                </div>

                <div className="md:flex gap-4">
                  <div>
                    {renderFileUpload("image", "Cover Image", "image/*", false)}
                  </div>
                  <div>
                    {renderFileUpload("document", "Document", ".pdf", false)}
                  </div>
                </div>
                <div className="pt-[1px]">
                  {renderInput("title", "Title", "text")}
                </div>
              </div>
              {renderMarkdown("abstract", "Abstract")}
            </div>
            {renderButton("Submit", isLoading)}
          </div>
        )}
      </FormTemplate>
    </div>
  );
};

export default ResearchForm;

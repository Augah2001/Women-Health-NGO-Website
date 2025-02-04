"use client";

import { useEffect, useState } from "react";
import Joi from "joi";
import FormTemplate from "../Components/FormTemplate";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import apiClient from "../utils/apiClient";
import useFetchInitial from "@/app/hooks/useFetchInitial";
import { BiX } from "react-icons/bi";
import useDataUpdate from "@/app/hooks/useDataUpdate";
import { compressImage } from "../utils/compressImage";
import { deleteFile, uploadFile } from "../utils/uploadsupabse";
import { Image } from "../utils/types";

interface OutreachData {
  theme: string;
  location: string;
  From: string;
  To: string;
  body: string;
  description: string;
  images: Image[]; // Array of Blob objects

}

const initialOutreachData: OutreachData = {
  theme: "",
  location: "",
  From: "", // Or you can set a default date string if needed
  To: "", // Or you can set a default date string if needed
  body: "",
  description: "",
  images: [],
 
};

interface Props {
  id?: string;
  onClose: () => void;
  outreachItems: any;
  setOutreachItems: React.Dispatch<React.SetStateAction<any>>;
}

const OutreachForm = ({
  id,
  onClose,
  outreachItems,
  setOutreachItems,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [outreachData, setOutreachData] =
    useState<OutreachData>(initialOutreachData);

  const { data }: { data: OutreachData | null } = useFetchInitial<OutreachData>(
    {
      endpoint: "/outreach",
      id: id,
    }
  );

  useEffect(() => {
    if (data) {
      const {
        theme,
        location,
        From, // Or you can set a default date string if needed
        To, // Or you can set a default date string if needed
        body,
        description,
      } = data;
      setOutreachData({
        theme,
        location,
        From,
        To,
        body,
        description,
        images: [], // Assuming images are not included in the initial data
     
      });
    }
  }, [data]);

  const schema = Joi.object({
    theme: Joi.string().required().max(120).label("Theme"),
    location: Joi.string().required().label("Location"),
    From: Joi.date().required().label("From"),
    To: Joi.date().required().label("To"),
    images: Joi.any(),
    body: Joi.string().required().label("Body"),
    description: Joi.string().max(250).required().label("Description"),
  });

  const doSubmit = async () => {
    console.log('sssss')
    try {
      setIsLoading(true);
  
      const formData = new FormData();
  
      // Format dates to ISO strings
      formData.append("From", new Date(outreachData.From).toISOString());
      formData.append("To", new Date(outreachData.To).toISOString());
  
      // Append other fields
      formData.append("theme", outreachData.theme);
      formData.append("location", outreachData.location);
      formData.append("body", outreachData.body);
      formData.append("description", outreachData.description);
  
      let uploadedImages: Image[] = [];
      let oldImages: Image[] = []; // To store existing image URLs if updating
  
      if (id) {
        // Fetch existing outreach data to get old image URLs
        const {data:existingOutreach} = await apiClient.get<OutreachData>(`/outreach/${id}`);
        console.log(existingOutreach.images)
        oldImages = existingOutreach.images || [];
  
        // Delete old images from storage if new images are uploaded
        if (outreachData.images && outreachData.images.length > 0) {
          for (const oldImageUrl of oldImages) {
            await deleteFile(oldImageUrl.imageUrl);
          }
        }
      }

      
  
      // Upload new images and update image URLs
      console.log(outreachData.images)
      if (outreachData.images && outreachData.images.length > 0) {
        for (const image of outreachData.images) {
         
          if (image instanceof Blob) {
            // Compress and upload each image
            const compressedImage: any = await compressImage(image);
            const uploadedImageUrl = await uploadFile(compressedImage);
  
            if (uploadedImageUrl) {
             
              // Append image to formData if needed for other processing
              formData.append('images', uploadedImageUrl);
            } else {
              console.error("Image upload failed.");
              toast.error("Image upload failed.");
              setIsLoading(false); // Stop loading state
              return; // Exit function if upload fails
            }
          } else {
            console.error("Invalid image data. Please select valid image files.");
            toast.error("Invalid image data. Please select valid image files.");
            setIsLoading(false); // Stop loading state
            return; // Exit function if invalid image
          }
        }
      } 
  
      console.log(formData.getAll('images'))
      
      let response: any;
      if (id) {
        // Update existing outreach
        response = await apiClient.put(`/outreach/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        // Update outreachItems state
        if (outreachItems) {
          const updatedOutreachItems = outreachItems.map((item: any) =>
            item.id === response.data.id ? response.data : item
          );
          setOutreachItems(updatedOutreachItems);
        }
  
        toast.success("Outreach updated successfully");
      } else {
        // Create new outreach
        response = await apiClient.post("/outreach", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        setOutreachItems([response.data, ...outreachItems]);
        toast.success("Outreach added successfully");
      }
  
      // Close the modal or navigate after a delay
      setTimeout(() => {
        onClose(); // Or use router.push as needed
      }, 1000);
    } catch (error: any) {
      console.error(error);
  
      if (error.response) {
        toast.error(
          error.response.data.error || "Server error. Please try again later."
        );
      } else if (error.request) {
        toast.error(
          "No response from server. Please check your network connection."
        );
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="sm:mx-4 mb-8 rounded-md">
      <Toaster richColors position="bottom-center" />
      <FormTemplate
        schema={schema}
        doSubmit={doSubmit}
        data={outreachData}
        setData={setOutreachData}
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
            <h1 className="text-[#08210d] text-4xl font-normal mb-4">
              Peer Outreach
            </h1>
            <div className="">
              <div className="md:flex gap-4">
                <div className="md:w-[40%]">
                  {renderInput("theme", "Theme", "text")}
                </div>
                <div className="md:w-[40%] pt-[1px]">
                  {renderInput("location", "Location", "text")}
                </div>
              </div>

              <div className="md:flex gap-4">
                <div className="md:w-[40%]">
                  {renderInput("From", "From", "date")}
                </div>
                <div className="md:w-[40%]">
                  {renderInput("To", "To", "date")}
                </div>
              </div>
              <div className="md:flex gap-4">
                <div className="md:w-[40%] pt-[1px]">
                  {renderInput("description", "Description", "text")}
                </div>
                <div className="md:w-[40%] pt-[1px]">
                  {renderFileUpload("images", "Images", "image/*", true)}
                </div>
              </div>
            </div>
            {renderMarkdown("body", "Body")}
            {renderButton("Submit", isLoading )}
          </div>
        )}
      </FormTemplate>
    </div>
  );
};

export default OutreachForm;

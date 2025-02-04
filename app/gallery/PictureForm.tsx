"use client";

import { useEffect, useState } from "react";
import Joi from "joi";
import FormTemplate from "../Components/FormTemplate";
import { Toaster, toast } from "sonner";
// import { useRouter } from "next/navigation";
import apiClient from "../utils/apiClient";
import { BiX } from "react-icons/bi";
import { ImageCollection } from "@prisma/client";
import Compress from "react-image-file-resizer";

import { useRouter } from "next/navigation";
import { uploadFile } from "../utils/uploadsupabse";
import { compressImage } from "../utils/compressImage";

interface PictureData {
  images: File[]; // Array of File objects
  ImageCollectionTitle: string;
}

interface Props {
  onClose: () => void;
}

const PictureForm = ({ onClose }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageCollection, setImageCollection] = useState<
    { label: string; value: string }[]
  >([]);
  // const router = useRouter();

  const [pictureData, setPictureData] = useState<PictureData>({
    images: [],
    ImageCollectionTitle: "",
  });

  useEffect(() => {
    apiClient
      .get<ImageCollection[]>("/image-collections")
      .then((response) => {
        const newImageCollections = response.data.map((collection) => {
          return {
            label: collection.title,
            value: collection.title,
          };
        });

        setImageCollection(newImageCollections);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const schema = Joi.object({
    images: Joi.any(),
    ImageCollectionTitle: Joi.string().required().label("Image Collection"),
  });

  const doSubmit = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("ImageCollectionTitle", pictureData.ImageCollectionTitle);
  

  
      // Process all images
      if (pictureData.images && pictureData.images.length > 0) {
        const imagePromises = pictureData.images.map(async (image) => {
          const compressedImage: any = await compressImage(image);
          const result = await uploadFile(compressedImage);
          return result; // Collect the result (URL) of the uploaded image
        });
  
        // Wait for all images to be processed and uploaded
        const imageUrls = await Promise.all(imagePromises);
  
        // Append all image URLs to formData
        imageUrls.forEach((url) => {
          if (url) {
            formData.append("imageUrl", url);
          }
        });
  
        console.log("formData", formData.getAll("imageUrl"));
      }
  
      // Post the formData to the backend
      const response = await apiClient.post("/pictures", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
  
      console.log(response.data);
  
      toast.success(`Pictures uploaded successfully`);
  
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      const errorMessage = (typeof error.response?.data?.error === 'string' && error.response?.data?.error) || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="">
      <div className=" rounded-md">
        <Toaster richColors position="bottom-center" />
        <FormTemplate
          schema={schema}
          doSubmit={doSubmit}
          data={pictureData}
          setData={setPictureData}
        >
          {(
            renderInput,
            renderPasswordInput,
            renderButton,
            renderMarkdown,
            renderFileUpload,
            renderSelect
          ) => (
            <div>
              <div
                className=" text-2xl text-[#0c361d] flex justify-end "
                onClick={onClose}
              >
                <BiX />
              </div>
              <div>
                <h1 className="text-[#08210d] text-4xl font-normal mb-4">
                  Upload Pictures
                </h1>
                <div className="">
                  <div className="">
                    <div className=" w-[100%]">
                      {renderSelect(
                        "ImageCollectionTitle",
                        "Image Collection",
                        imageCollection
                      )}
                    </div>
                    <div className="">
                      {renderFileUpload("images", "Image(s)", "image/*", true)}
                    </div>
                  </div>
                </div>
                {renderButton("Submit", isLoading)}
              </div>
            </div>
          )}
        </FormTemplate>
      </div>
    </div>
  );
};

export default PictureForm;

"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Joi from "joi";
import FormTemplate from "../../Components/FormTemplate";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import apiClient from "../../utils/apiClient";
import { News } from "@prisma/client";
import { BiX } from "react-icons/bi";
import { deleteFile, uploadFile } from "@/app/utils/uploadsupabse";
import { compressImage } from "@/app/utils/compressImage";

interface NewsData {
  date: string;
  title: string;
  body: string;
  id?: number | undefined;
  image?: File[] | null;
  imageUrl?: string;
}

interface Props {
  id?: string | number;

  setNewsList: Dispatch<SetStateAction<any>>;
  onClose: () => void;
}

const NewsForm = ({ id, setNewsList, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  const [newsData, setNewsData] = useState<NewsData>({
    date: "",
    title: "",
    body: "",
    image: null,
  });

  const schema = Joi.object({
    date: Joi.date().required().label("Date"),
    title: Joi.string().max(140).required().label("Title"),
    body: Joi.string().required().label("Body"),
    image: Joi.any().label("Image"),
    imageUrl: Joi.string().label("Image Url"),
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const { data } = await apiClient.get<NewsData>(`/news/${id}`);
          setNewsData({
            date: data.date,
            title: data.title,
            body: data.body,
            image: null, // Assuming you'll set this via file input
            imageUrl: data.imageUrl, // Assuming you'll set this via file input
          });
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [id]);

  

  const doSubmit = async () => {
    try {
      setIsLoading(true);
  
      const formData = new FormData();
  
      let imagePath = null;
      let oldImagePath = newsData.imageUrl; // Assuming the current image URL is stored in newsData.imageUrl
  
      if (newsData?.image?.[0]) {
        // Compress and upload the new image to Supabase Storage
        const compressedImage: any = await compressImage(newsData.image[0]);
        const uploadedImage = await uploadFile(compressedImage);
  
        if (uploadedImage) {
          imagePath = uploadedImage; // Save the new image path
  
          // Delete the old image if it exists
          if (oldImagePath) {
            await deleteFile(oldImagePath);
          }
        } else {
          console.error("Image upload failed.");
        }
      } else {
        imagePath = oldImagePath; // Keep the old image if no new image is uploaded
      }
  
      // Ensure date is in ISO-8601 format with a default time component
      const formattedDate = new Date(newsData.date).toISOString();
      formData.append("date", formattedDate);
      formData.append("title", newsData.title || "");
      formData.append("body", newsData.body || "");
      formData.append("imageUrl", imagePath || ""); // Append image URL, not image file
  
      // Send the form data
      const response = id 
        ? await apiClient.put(`/news/${id}`, formData, { // Update existing news
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await apiClient.post("/news", formData, { // Create new news
            headers: { "Content-Type": "multipart/form-data" },
          });
  
      // Handle success response
      toast.success(id ? "News updated successfully" : "News added successfully");
      setNewsList((prevNewsList: any) => 
        id 
          ? prevNewsList.map((news: any) =>
              news.id === response.data.id ? response.data : news
            )
          : [response.data, ...prevNewsList]
      );
      setTimeout(() => onClose(), 1000);
    } catch (error: any) {
      const errorMessage = (typeof error.response?.data?.error === 'string' && error.response?.data?.error) || "An error occurred.";
      toast.error(errorMessage);
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
        data={newsData}
        setData={setNewsData}
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
              <h1 className="text-black text-2xl font-bold mb-4">News</h1>
              <div className="">
                <div className="">
                  {renderFileUpload("image", "Cover Image", "image/*", false)}
                </div>
                <div className="md:flex w-full gap-4">
                  <div className="md:w-[40%]">
                    {renderInput("date", "Date", "date")}
                  </div>
                  <div className="md:w-[40%] pt-[1px]">
                    {renderInput("title", "Title", "text")}
                  </div>
                </div>
                {renderMarkdown("body", "Body")}
              </div>
              {renderButton("Submit", isLoading)}
            </div>
          </div>
        )}
      </FormTemplate>
    </div>
  );
};

export default NewsForm;

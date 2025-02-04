import { AxiosResponse } from "axios"; // Assuming you're using Axios

import {toast} from 'sonner'
import apiClient from "../utils/apiClient";
import { deleteFile } from "../utils/uploadsupabse";
import { Image } from "../utils/types";

interface ItemWithId {
  id?: string | number | undefined ;
}

const useDelete= <T extends ItemWithId>(
  
) => {
    return async(endpoint: string,{id, imageUrl, documentUrl, images}:
        {id: string | number | undefined, imageUrl?: string, documentUrl?: string, images?: Image[]},
        setData: React.Dispatch<React.SetStateAction<any>>,
        successMessage: string = "Item deleted successfully!",
        errorMessagePrefix: string = "Failed to delete the item.") => {
        
        try {

          if (images && images.length > 0)  {
            for (const image of images) {
              const deletedImage = await deleteFile(image.imageUrl)
              if (!deletedImage) {
                throw new Error("Failed to delete file on the server")
              }
            }
          }
          if (imageUrl) {
            const deletedImage = await deleteFile(imageUrl)
     
            if (!deletedImage) {
              throw new Error("Failed to delete file on the server")
              
            }
          }
          if (documentUrl) {
            const deletedDoc = await deleteFile(documentUrl)
     
            if (!deletedDoc) {
              throw new Error("Failed to delete file on the server")
              
            }
          }
            const res: AxiosResponse = await apiClient.delete(`${endpoint}/${id}`);
         
        
            if (res.status === 200) {
              setData((prevData: any) =>
                prevData ? prevData.filter((item: any) => item.id !== id) : null
              );
              toast.success(successMessage);
            } else {
              toast.error(`${errorMessagePrefix} Please try again.`);
            }
          } catch (error: any) {
            console.error(error);
            toast.error(
              error.response?.data?.error || `${errorMessagePrefix} An error occurred.`
            );
          }
    }
  
};

export default useDelete;
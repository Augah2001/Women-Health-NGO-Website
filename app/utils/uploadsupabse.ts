import { supabase } from "./supabase";
  import { saveAs } from "file-saver";

function generateRandomString(length: number=12) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }





  
  // Function to extract the file path from URL (assuming it includes the full URL)
  
  
  // Function to download the file from Supabase and trigger save
  export const downloadFile = async (url: string) => {
    const path = extractFilePathFromUrl(url);
    if (!path) {
      console.error("File path extraction failed");
      return;
    }
  
    try {
      const { data, error } = await supabase.storage.from('Zcldn-uploads').download(path);
  
      if (error) {
        console.error("Error downloading file:", error.message);
        return;
      }
  
      if (data) {
        // Use file-saver to save the downloaded file
        saveAs(data, path.split('/').pop()); // Extract the file name from the path
      }
    } catch (err) {
      console.error("Error during file download:", err);
    }
  };
  


  export function extractFilePathFromUrl(url: string): string | null {
    try {
      // Find the index of "/public/" in the URL
      const publicIndex = url.indexOf('/public/');
  
      if (publicIndex === -1) {
        console.error('The URL does not contain "/public/".');
        return null;
      }
  
      // Extract the part of the URL after "/public/"
      const fullPath = url.substring(publicIndex + 8); // 8 is the length of "/public/"
  
      // Remove the bucket name from the full path (everything before the next "/")
      const filePath = fullPath.substring(fullPath.indexOf('/') + 1);
  
      return filePath;
    } catch (err) {
      console.error('Error extracting file path from URL:', err);
      return null;
    }
  }
  
  
  


  export const deleteFile = async (url: string) => {
    const path = extractFilePathFromUrl(url)
    if (!path) {
      console.error("File path extraction failed");
      return;
    }

    try {
      const { error } = await supabase
        .storage
        .from('Zcldn-uploads') // Name of the bucket
        .remove([path]);
  
      if (error) {
        console.error('Error deleting file:', error);
        return false;
      }
  
      return true;
    } catch (err) {
      console.error('Error during file deletion:', err);
      return false;
    }
  };
  
  


export const uploadFile = async (file: File): Promise<string | null> => {

  try {
    const { data, error } = await supabase
      .storage
      .from('Zcldn-uploads') // Name of the bucket
      .upload(`public/${generateRandomString(12)}${Date.now().toString()}`, file);

    if (error) {
      console.error('Error uploading file:', error);
      return null;
    }

    return data?.path ? supabase.storage.from('Zcldn-uploads').getPublicUrl(data.path).data.publicUrl : null;
  } catch (err) {
    console.error('Error during file upload:', err);
    return null;
  }
};

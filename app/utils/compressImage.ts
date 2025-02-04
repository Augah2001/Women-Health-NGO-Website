import Compress from 'react-image-file-resizer'
      // Helper function to compress an image
      export const compressImage = (image: any) => {
        return new Promise((resolve) => {
          Compress.imageFileResizer(
            image,
            600,
            600,
            "JPEG",
            80,
            0,
            (uri) => resolve(uri),
            "blob"
          );
        });
      };
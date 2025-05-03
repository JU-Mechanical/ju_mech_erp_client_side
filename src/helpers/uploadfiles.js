import dotenv from 'dotenv';
//dotenv.config();

export const uploadFileToCloudinary = async (file) => {
    if (!file) {
      throw new Error("No file provided");
    }

    //const cloudName=process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'default'); // Replace with your Cloudinary upload preset
    formData.append('cloud_name', `df9fz5s3o`); // Replace with your Cloudinary cloud name
  
    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/df9fz5s3o/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error?.message || 'Upload failed');
      }
      
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };
  
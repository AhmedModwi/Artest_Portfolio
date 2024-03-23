"use client";
import uploadFileToFirebaseStorage from '@/app/firebase/storage'; 
import { useState } from 'react';
import { FcAddImage } from 'react-icons/fc';

const AddMainImage = ({ imageURL, setImageURL }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const downloadURL = await uploadFileToFirebaseStorage(file, 'images');
        setImageURL(downloadURL);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading file: ', error);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      try {
        const downloadURL = await uploadFileToFirebaseStorage(file, 'images');
        setImageURL(downloadURL);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading file: ', error);
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center  border-dashed border-2 border-gray-300 rounded-lg py-2 my-3"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {!imagePreview ? (
        <>
          <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center">
            <FcAddImage className="text-4xl mb-2" />
            <p className="text-sm text-gray-600">
              Drag and drop the image here or click to select an image
            </p>
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </>
      ) : (
        <>
          <img
            src={imagePreview}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-lg"
          />
          <p className="mt-2 text-sm text-gray-600">Image URL: {imageURL}</p>
        </>
      )}
    </div>
  );
};

export default AddMainImage;

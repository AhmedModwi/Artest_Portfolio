"use client";
import uploadFileToFirebaseStorage from '@/app/firebase/storage'; 
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Grid } from 'swiper/core';
import 'swiper/swiper-bundle.css';
import { FcAddImage } from "react-icons/fc";



// Install Swiper modules
SwiperCore.use([Pagination, Grid]);
const AddImages = ({ onImagesUploaded }) => {
  const [imageURLs, setImageURLs] = useState([]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    try {
      const uploads = files.map(async (file) => {
        const downloadURL = await uploadFileToFirebaseStorage(file, 'images');
        setImageURLs(prevURLs => [...prevURLs, downloadURL]);
      });

      await Promise.all(uploads);
      onImagesUploaded(imageURLs); // Pass the updated list of image URLs to the parent component
    } catch (error) {
      console.error('Error uploading files: ', error);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    try {
      const uploads = files.map(async (file) => {
        const downloadURL = await uploadFileToFirebaseStorage(file, 'images');
        setImageURLs(prevURLs => [...prevURLs, downloadURL]);
      });
      
      await Promise.all(uploads);
    } catch (error) {
      console.error('Error uploading files: ', error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center  border-dashed border-2 border-gray-300 rounded-lg py-2 my-3"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <label htmlFor="image-upload" className="cursor-pointer mb-4 flex flex-col items-center justify-center">
          <FcAddImage className="text-4xl " />
          <p className="text-sm text-gray-600">Drag and drop images here or click to select images</p>
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          className="hidden"
          multiple
          onChange={handleImageUpload}
        />
      </div>

      <Swiper
        slidesPerView={3}
        grid={{
          rows: 2,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {imageURLs.map((url, index) => (
          <SwiperSlide key={index}>
            <img src={url} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default AddImages;
"use client";
import React, { useState } from 'react';
import { IoIosCloudDone } from "react-icons/io5";
import { Dialog } from '@mui/material';
import { FiEdit3 } from "react-icons/fi";
import ImageUploader from './AddMainImage';
import AddText from './AddText'; 
import AddCategory from './AddCategory'; 
import AddTags from './AddTags'; 
import AddImages from './AddImages'; 
import { deleteImageFromStorage } from '@/app/firebase/storage';
import { addDocument } from '@/app/firebase/firestore';
import Link from 'next/link'; 

export default function AddPost({ Categories, Tags, Class }) {
    const [open, setOpen] = useState(false);
    const [postData, setPostData] = useState({
        Title: '',
        Content: '',
        Category: '',
        tags: [],
        mainImage: '',
        images: [],
    });
    const [errors, setErrors] = useState([]); 
    const error_messages = {
        'no_title' : "You didn't enter a title. Every post must have a title",
        'title_length': 'The title must be between 1 and 50 characters',
        'Content_length': 'The content must be less than 500 characters',
        'no_category' : "You didn't enter a category. Every post must have a category",
        'invalid_category': "Invalid category selected. Go to admin/edit to add this category",
        'invalid_tag': 'Tag is not in the list of available tags. Go to admin/edit to add this tag',
        'missing_main_image': 'Main post image is required',
        'invalid_image_url': 'Invalid image URL ',
        // Add more error codes and corresponding messages as needed
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // Delete main image from storage
        postData.mainImage!= '' && deleteImageFromStorage(postData.mainImage);
        // Delete images from storage
        postData.images!= []&& postData.images.forEach(image => deleteImageFromStorage(image));
        // Close the Dialog
        setOpen(false);
    };

    const validatePostData = () => {
        let validationErrors = [];

        // Title validation
        if (!postData.Title) {
            validationErrors.push('no_title');
        } else if (postData.Title.length > 50) {
            validationErrors.push('title_length');
        }

        // Content validation
        if (postData.Content.length > 500) {
            validationErrors.push('Content_length');
        }

        // Category validation
        if (!postData.Category) {
            validationErrors.push('no_category');
        } else if (!Categories.includes(postData.Category)) {
            validationErrors.push('invalid_category');
        }

        // Tags validation
        postData.tags.forEach(tag => {
            if (!Tags.includes(tag.text)) {
                validationErrors.push('invalid_tag');
            }
        });

        // Main image validation
        if (!postData.mainImage) {
            validationErrors.push('missing_main_image');
        } else if (!postData.mainImage.startsWith('https://firebasestorage.googleapis.com/') && !postData.mainImage.startsWith('https://storage.googleapis.com/')) {
            validationErrors.push('invalid_image_url');
        }

        // Images validation
        postData.images.forEach(imageUrl => {
            if (!imageUrl.startsWith('https://firebasestorage.googleapis.com/') && !imageUrl.startsWith('https://storage.googleapis.com/')) {
                validationErrors.push('invalid_image_url');
            }
        });

        setErrors(validationErrors); // Update errors state with validation errors
        return validationErrors.length === 0;
    };

    const handleSubmit = async () => {
    const isValid = validatePostData();

    if (isValid) {
        const documentName = postData.Title;
        const collectionName = postData.Category;
        const documentData = {
            Title: postData.Title,
            Content: postData.Content,
            Category: postData.Category,
            tags: postData.tags,
            mainImage: postData.mainImage,
            images: postData.images,
        };

        // Add the document to Firestore
        const docId = await addDocument(collectionName, documentName, documentData);
        if (docId) {
            // Clear the form data
            setPostData({
                Title: '',
                Content: '',
                Category: '',
                tags: [],
                mainImage: '',
                images: [],
            });
            setErrors('no errors');
            setTimeout(() => {
                setOpen(false);
            }, 1500);
        } else {
            setErrors('Error adding the document to Firestore');
            }
        } 
    };


    return (
        <>
            {/* Opening button */}
            <button onClick={handleOpen} className={Class}>
                <FiEdit3  className="size-full" />
            </button>

            {/* Dialog starts */}
            <Dialog open={open} onClose={handleClose} className='w-[80vw] '>
                {errors === 'no errors' ? (
                    <div className="text-center">
                        <div style={{ width: '75%', margin: '0 auto' }}>
                            <IoIosCloudDone size={100} />
                        </div>
                        <p className="text-xxl mt-4">THE POST IS LIVE NOW</p>
                    </div>
                ) : (
                <form className="p-4">
                    {/* The title field of the post */}
                    <AddText
                        label="Title"
                        value={postData.Title}
                        onChange={(e) => setPostData({ ...postData, Title: e.target.value })}
                        numberOfLetters={50} // Specify the number of letters for the title
                    />

                    {/* The content of the post */}
                    <AddText
                        label="Content"
                        value={postData.Content}
                        onChange={(e) => setPostData({ ...postData, Content: e.target.value })}
                        numberOfLetters={500} // Specify the number of letters for the content
                    />

                    {/* Adding the category of the post */}
                    <AddCategory
                        CategoriesList={Categories} // Pass Categories prop
                        onAddCategory={(category) => setPostData(prevData => ({ ...prevData, Category: category }))}
                    />

                    {/* Adding the tags for the post*/}
                    <AddTags
                        TagsList={Tags} // Pass Tags prop
                        onAddTag={(tag) => setPostData(prevData => ({ ...prevData, tags: [...prevData.tags, tag] }))}
                    />

                    {/* The main post image*/}
                    <div>
                        <ImageUploader
                            className='m-3 p-4'
                            imageURL={postData.mainImage} // Pass mainImage as prop
                            setImageURL={(url) => setPostData({...postData, mainImage: url})} // Update mainImage state
                        />
                    </div>

                    {/* The more post images*/}
                    <AddImages onImagesUploaded={(imageURLs) => setPostData({...postData, images: imageURLs})} />
                    
                    {/* Display errors */}
                    {errors.length > 0 && (
                        <p className="text-red-500 mt-4">
                            {errors.map((error, index) => (
                                error === 'invalid_category' || error === 'invalid_tag' ? (
                                    <Link key={index} href="/admin/edit"><a className="text-red-500">{error_messages[error]}</a></Link>
                                ) : (
                                    <span key={index}>{error_messages[error]}<br /></span>
                                )
                            ))}
                        </p>
                    )}

                    {/* Form action buttons */}
                    <div className='flex'>
                        <button onClick={handleSubmit} className="bt">
                            Submit
                        </button>

                        <button onClick={handleClose} className="bt">
                            Cancel
                        </button>
                    </div>
                </form>
                )}
            </Dialog>
        </>
    );
}

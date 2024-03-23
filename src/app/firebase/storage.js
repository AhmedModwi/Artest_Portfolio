
import { getDownloadURL as getFirebaseDownloadURL, ref as firebaseRef, uploadBytes as firebaseUploadBytes } from 'firebase/storage';
import { storage as firebaseStorage } from './firebase';

// Function to upload a file to Firebase Storage and get the download URL
export const uploadFileToFirebaseStorage = async (file, folder) => {
  // Create a reference to the storage bucket
  const storageRef = ref(storage);

  // Specify the folder (if needed)
  const folderRef = ref(storageRef, folder);

  // Upload the file
  const fileRef = ref(folderRef, file.name);
  await uploadBytes(fileRef, file);

  // Get the download URL
  const downloadURL = await getDownloadURL(fileRef);

  return downloadURL;
};

// Function to delete an image from Firebase Storage using its download URL
export const deleteImageFromStorage = async (imageUrl) => {
    try {
        // Convert download URL to storage path
        const storageRef = storage.refFromURL(imageUrl);

        // Delete the file from storage
        await storageRef.delete();

        console.log('Image deleted successfully from Firebase Storage');
    } catch (error) {
        console.error('Error deleting image from Firebase Storage:', error);
    }
};

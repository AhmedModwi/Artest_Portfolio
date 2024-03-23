"use client";
import { useState } from 'react';
import { Dialog, TextField, MenuItem, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import { db } from '../firebase/firebase'; 
import { doc, setDoc, collection, getDocs, query, orderBy,limit,where} from 'firebase/firestore';
import uploadFileToFirebaseStorage from '../firebase/storage';
import { AiOutlinePlus , AiOutlineEdit} from 'react-icons/Ai';

function DynamicForm({ config , Class , newDocument , docId }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});  
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const collectionName = config[0];
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

// Function to add a new document with a sequential number as the ID
async function addDocumentWithSequentialNumber(collectionName, formData) {

  // Query the collection to find the highest number currently in use
  const collectionRef = collection(db, collectionName);
  const querySnapshot = await getDocs(query(collectionRef, orderBy('number', 'desc'), limit(1)));

  let lastUsedNumber = 0;

  if (!querySnapshot.empty) {
    // If there are documents, use the highest number + 1
    lastUsedNumber = querySnapshot.docs[0].data().number;
  }

  const newNumber = lastUsedNumber + 1;

  // Set the new document with the sequential number as the ID

  await setDoc(doc(collectionRef, newNumber), { ...formData, number: newNumber });
}


const handleImage = async (name, file) => {
  try {
    if (file) {
      const folder = collectionName;
      const url = await uploadFileToFirebaseStorage(file, folder);

      // Update the formData state with the image URL and field name
      setFormData((prev) => ({ ...prev, [name]: url }));
    }
  } catch (error) {
    console.error('Error uploading image: ', error);
  }
};


async function getDocumentRefByNumber(collectionName, number) {
  try {
    const collectionRef = collection(db, collectionName);

    // Create a query to find documents where the 'number' field matches the provided value
    const q = query(collectionRef, where('number', '==', number));
    
    // Execute the query
    const querySnapshot = await getDocs(q);

    // Check if there is a matching document
    if (!querySnapshot.empty) {
      // Return the reference to the first matching document
      return querySnapshot.docs[0].ref;
    } else {
      console.log(`No document found with 'number' equal to ${number}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching document reference: ', error);
    return null;
  }
}

const handleSubmit = async () => {
  try {
    setSubmissionStatus('loading');
    if (newDocument) {
      await addDocumentWithSequentialNumber(collectionName, formData);
    } else {
      if (!docId) {
        console.error("Error: Document ID is missing.");
        setSubmissionStatus('error');
        return;
      }

      const documentRef = doc(collection(db, collectionName), docId); // Corrected this line

      // Use setDoc to update an existing document
      await setDoc(documentRef, {
        ...formData,
        Image: formData.Image
      });
    }

    // Set success status.
    setSubmissionStatus('success');

    // Reset the form and close the dialog after a brief delay (you can adjust the delay).
    setTimeout(() => {
      setFormData({});
      setOpen(false);
      setSubmissionStatus(null); // Clear the status message.
    }, 2000); // 2 seconds
  } catch (error) {
    console.error("Error saving document: ", error);
    console.error("Error details: ", error.details); // Log error details for debugging
    setSubmissionStatus('error'); // Set error status.
  }
};

const handleDelete = async () => {
  try {
    setSubmissionStatus('loading');
    if (!docId) {
      console.error("Error: Document ID is missing.");
      return;
    }

    // Use getDocumentRefByNumber to retrieve the documentRef based on the 'number' field
    const documentRef = await getDocumentRefByNumber(collectionName, docId);

    if (documentRef) {
      // Delete the document with the retrieved documentRef
      await deleteDoc(documentRef);

      // Set success status.
      setSubmissionStatus('success');

      // Reset the form and close the dialog after a brief delay (you can adjust the delay).
      setTimeout(() => {
        setFormData({});
        setOpen(false);
        setSubmissionStatus(null); // Clear the status message.
      }, 2000); // 2 seconds
    } else {
      console.error(`No document found with 'number' equal to ${docId}`);
    }
  } catch (error) {
    console.error("Error deleting document: ", error);
    setSubmissionStatus('error'); // Set error status.
  }
};


  return (
    <>
      <button onClick={handleClickOpen} className={`${Class} absolute z-30 flex-grow flex justify-around items-center flex-row gap-5 p-2 m-5
       border-gold-600  hover:bg-gold-400 hover:border-gold-400 text-gold-400 rounded-full
        hover:text-graya-900 hover:border-solid hover:border-2 `}>
        {newDocument?
        (<AiOutlinePlus className='w-full h-full '/>):
        (<AiOutlineEdit className='w-full h-full '/>)
      }
      </button>
      
      <Dialog open={open} onClose={handleClose}>
        <form className="p-4">
          {config.slice(1).map((field, index) => {
            const { type, name, ...other } = field;
            switch (type) {
              case 'text':
                return (
                  <TextField
                    key={index}
                    label={name}
                    placeholder={other.holder}
                    inputProps={{ maxLength: other.length }}
                    onChange={e => handleChange(name, e.target.value)}
                    className='w-full my-2'
                  />
                );
              case 'menu':
                return (
                  <TextField
                    key={index}
                    select
                    label={name}
                    onChange={e => handleChange(name, e.target.value)}
                    fullWidth
                    className='my-2'
                  >
                    {other.choices.map((option, idx) => (
                      <MenuItem key={idx} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              case 'boolean':
                return (
                  <div key={index} className="my-2">
                    <FormControlLabel
                      control={
                        <Checkbox onChange={e => handleChange(name, e.target.checked)} />
                      }
                      label={name}
                    />
                  </div>
                );
              case 'date':
                return (
                  <div key={index} className="my-2">
                    <input
                      type="date"
                      onChange={e => handleChange(name, e.target.value)}
                      className="border rounded p-2 w-[50%]"
                    />
                  </div>
                );
               case 'image':
                return (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImage(name, e.target.files[0])} // Pass the field name and the selected file
                    className="my-2"
                  />
                );

              default:
                return null;
            }
          })}
          <div className="flex justify-end mt-4">
            {newDocument ? (
            <Button onClick={handleSubmit} color="primary" variant="contained">
              Submit
            </Button>
            ) : 
            <Button onClick={handleSubmit} color="primary" variant="contained">
              Update
            </Button>
            }
            <Button onClick={handleClose} color="secondary" className="ml-2">
              Cancel
            </Button>
            {!newDocument && (
            <Button onClick={handleDelete} color="secondary" className="ml-2">
              Delete
            </Button>
            )}
          </div>
          {submissionStatus === 'loading' && (
            <p className=" text-yellow-500 mt-2">Loading...</p>
          )}
          {submissionStatus === 'success' && (
            <p className="text-green-500 mt-2">Submission successful!</p>
          )}
          {submissionStatus === 'error' && (
            <p className="text-red-500 mt-2">Submission failed. Please try again.</p>
          )}
        </form>
      </Dialog>
    </>
  );
}

export default DynamicForm;

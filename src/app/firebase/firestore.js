import { db } from '@/app/firebase/firebase'; 
import { collection, query, limit, getDocs } from 'firebase/firestore';

export async function getDocsList(collectionName, numberOfDocs = null) {
  const collectionRef = collection(db, collectionName);
  let querySnapshot;

  if (numberOfDocs) {
    const queryConstraint = limit(numberOfDocs);
    querySnapshot = await getDocs(query(collectionRef, queryConstraint));
  } else {
    querySnapshot = await getDocs(collectionRef);
  }

  const docs = querySnapshot.docs.map((doc) => doc.data());
  return docs;
}


export async function addDocument(collectionName, documentName, data) {
  try {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, data, { id: documentName });
    return docRef.id; // Return the ID of the newly added document
  } catch (error) {
    console.error('Error adding document: ', error);
    return null; // Return null in case of an error
  }
}
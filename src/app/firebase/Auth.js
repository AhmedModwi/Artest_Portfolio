"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as authSignOut } from 'firebase/auth';
import { auth, db } from './firebase'; // Import your Firebase and Firestore configuration
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
 const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    
async function getAdminLevel(userEmail) {
  try {
    // Create a reference to the "admins" collection
    const adminsCollectionRef = collection(db, 'admins');

    // Create a query to find documents where the 'email' field matches the user's email
    const q = query(adminsCollectionRef, where('email', '==', userEmail));

    // Execute the query and get the results
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // If the document exists, return the admin level
      const adminDoc = querySnapshot.docs[0].data();
      return adminDoc.level; // Assuming "level" is the field that stores the admin level
    } else {
      // If the document doesn't exist, the user is not an admin
      return null;
    }
  } catch (error) {
    console.error('Error checking admin level:', error);
    throw error;
  }
}

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [adminLevel, setAdminLevel] = useState(null); // New state to hold admin level

  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
    setAdminLevel(null); // Clear admin level when signing out
  };

  const authStateChanged = async (user) => {
    setIsLoading(true);
    if (!user) {
      clear();
      return;
    }

    // Get the user's admin level based on their email
    const adminLevel = await getAdminLevel(user.email);

    setAuthUser({
      uid: user.uid,
      email: user.email,
    });

    setAdminLevel(adminLevel); // Set the admin level state

    setIsLoading(false);
  };

  const signOut = () => authSignOut(auth).then(clear);

  // Listen for Firebase Auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    isLoading,
    signOut,
    adminLevel, // Include admin level in the return object
  };
}

const AuthUserContext = createContext({
  authUser: null,
  isLoading: true,
  signOut: async () => {},
  adminLevel: null, // Include admin level in the default context
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>;
}

export const useAuth = () => useContext(AuthUserContext);

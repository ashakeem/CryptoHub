// Import necessary modules and functions from React and Firebase
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Create a context to manage user authentication state
const UserContext = createContext();

// Create a provider component to wrap the application and manage authentication state
export const AuthContextProvider = ({ children }) => {
  // State to hold the current user information
  const [user, setUser] = useState({});

  // Function to sign up a new user and create an associated document in the "users" collection
  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
    return setDoc(doc(db, "users", email), {
      watchList: [],
    });
  };

  // Function to sign in an existing user
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to log out the current user
  const logout = () => {
    return signOut(auth);
  };

  // Effect to listen for changes in authentication state and update the user accordingly
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  // Provide the authentication context to the application
  return (
    <UserContext.Provider value={{ signUp, signIn, logout, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Custom hook to easily access the authentication context in functional components
export const UserAuth = () => {
  return useContext(UserContext);
};

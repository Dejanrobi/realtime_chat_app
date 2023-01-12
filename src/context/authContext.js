import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

// creating out context
export const AuthContext = createContext();

// creating the context provider passing the components
export const AuthContextProvider = ({ children }) => {
  // Creating the current user using useState
  // At the beginning, we will not have any user
  // const [isUserIn, setIsUserIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  

  // Checking whether we have a user
  useEffect(() => {
    // using the onAuthStateChanged to check if there is  a user
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  // wrapping our children(all components) to access the authContextProvider
  // Sending the value to be accessed of currentUser
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};

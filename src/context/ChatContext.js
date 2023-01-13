import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import { AuthContext } from "./authContext";

// creating out context
export const ChatContext = createContext();



// creating the context provider passing the components
export const ChatContextProvider = ({ children }) => {
    // importing the current user
    const currentUser = useContext(AuthContext)
  
    // User Reducer for the chatContext
    const INITIAL_STATE={
        chatId:"null",
        user:{}
    }

    const chatReducer = (state, action)=>{
        // change the userChats whenever we click on the user
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user:action.payload,
                    chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid: action.payload.uid+currentUser.uid

                }

            default:
                return state;
        }
    }
  
    // Getting our state and dispatch to be used in any component
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  

    return (
        <ChatContext.Provider value={{data:state, dispatch}}>{children}</ChatContext.Provider>
    );
};

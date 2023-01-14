import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import { ChatContext } from "../../../context/ChatContext";
import { firestoreDb } from "../../../firebase";

// importing css
import "./chats.css";

const Chats = () => {
  // chats useState
  const [chats, setChats]  = useState([])

  // chats.forEach((chat)=>{
  //   console.log([chat[0]])
  //   console.log([chat[1]])
  // })
  // console.log(Object.entries(chats))

  // chats.map(chat=>{
  //   
  // })

  // Getting the current User
  const currentUser = useContext(AuthContext)

  // Getting the current selected chats
  const {dispatch} = useContext(ChatContext)

  // Fetching the data in realtime
  useEffect(()=>{
    const getChats=()=>{
      const unsub = onSnapshot(doc(firestoreDb, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data())
      });

      // Cleaning up the snapshot
      return()=>{
        unsub();
      }
      
    }
    
    currentUser.uid && getChats()
  },[currentUser.uid])

  // Select function
  // const numberChats = chats.length
  const handleSelect = (userInfo) =>{
    // Updating our user
    dispatch({type:"CHANGE_USER", payload:userInfo})
  }

  // console.log(Object.entries(chats))
  // console.log(Object.entries(chats))
  // console.log(Object.keys(chats).length)
  
  
  // Checking if there are any userChats, if not, we return No Chats
  
  if (chats && Object.keys(chats).length > 0) {
    return (
      <div className="chats">
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
          // <div key={key}>{value}</div>
          <div className="userChat" key={chat[0]} onClick={()=>{handleSelect(chat[1].userInfo)}}>            
              <img
                src={chat[1].userInfo.photoURL}
                alt=""
              />
              <div className="userChatInfo">
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
        ))}
      </div>
    );
  }
  return <div className="noChats"><p>No Chats</p></div>;
  
     
  
};

export default Chats;

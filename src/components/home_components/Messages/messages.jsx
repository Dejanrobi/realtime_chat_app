import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";

// importing components
import { Message } from "../..";
import { ChatContext } from "../../../context/ChatContext";
import { firestoreDb } from "../../../firebase";

// importing css
import "./messages.css";

const Messages = () => {

  // Creating a usestate messages
  const [messages, setMessages] = useState([]);
  // importing the chatContext
  const {data} = useContext(ChatContext);

  // Fetching the combined Id messages
  useEffect(()=>{
    const unSub = onSnapshot(doc(firestoreDb, "chats", data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })

    return ()=>{
      unSub()
    }
  },[data.chatId])

  // console.log(messages);

  // console.log(messages)
  return (
    <div className="messages">
      {/* <Message/>
      <Message/>
      <Message/>
      <Message/> */}
      {
        messages.map(m=>(
          <Message message={m} key={m.id}/>
        ))
      }
      
      
    </div>
  );
};

export default Messages;

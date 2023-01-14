import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../context/authContext";
import { ChatContext } from "../../../context/ChatContext";

// Importing css
import "./message.css";

const Message = ({message}) => {
  // console.log(message)
  // Getting the current User
  const currentUser = useContext(AuthContext)
  // Chat context
  const {data} = useContext(ChatContext)
  // console.log(message.img)

  // Scrolling to the end of the message when you write something using the useRef Hook
  const ref = useRef();

  // scrolling whenever we create a new message
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message]);

  return (
    // <p>Hello how are you</p>
    // Adding the owner of the message
    
    <div ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img
          src={message.senderId === currentUser.uid? currentUser.photoURL: data.user.photoURL}
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        {
          message.text && <p>{message.text}</p>
        }
        
        {
          message.img && <img src={message.img} alt="" />
        }
        
      </div>
    </div>
  );
};

export default Message;

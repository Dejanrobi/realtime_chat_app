import React, { useContext } from "react";
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
  return (
    // <p>Hello how are you</p>
    // Adding the owner of the message
    
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img
          src={message.senderId === currentUser.uid? currentUser.photoURL: data.user.photoURL}
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        <img
          src={message.img && <img
            src={message.img}
            alt=""
          />} 
          alt=""
        />
      </div>
    </div>
  );
};

export default Message;

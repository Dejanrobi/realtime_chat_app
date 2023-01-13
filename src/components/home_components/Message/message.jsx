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
    <div className="message">
      <div className="messageInfo">
        <img
          src="https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img
          src="https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>
    </div>
  );
};

export default Message;

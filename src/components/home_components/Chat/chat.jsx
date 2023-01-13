import React, { useContext } from "react";
import { Input, Messages } from "../..";
import { add, cam, more } from "../../../constants/images";
import { ChatContext } from "../../../context/ChatContext";

// importing css
import "./chat.css";
function Chat() {

  // Importing the chatContext
  const {data} = useContext(ChatContext)
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={cam} alt="" />
          <img src={add} alt="" />
          <img src={more} alt="" />
        </div>
      </div>

      <Messages />
      <Input />
    </div>
  );
}

export default Chat;

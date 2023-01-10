import React from "react";
import { Input, Messages } from "../..";
import { add, cam, more } from "../../../constants/images";

// importing css
import "./chat.css";
function chat() {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Jane</span>
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

export default chat;

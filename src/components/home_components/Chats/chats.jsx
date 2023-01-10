import React from "react";

// importing css
import "./chats.css";

const chats = () => {
  return (
    <div className="chats">
      <div className="userChat">
        <img
          src="https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <div className="userChatInfo">
          <span>Chandler</span>
          <p>Hello</p>
        </div>
      </div>

      <div className="userChat">
        <img
          src="https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <div className="userChatInfo">
          <span>Esther</span>
          <p>Hello</p>
        </div>
      </div>

      <div className="userChat">
        <img
          src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <div className="userChatInfo">
          <span>Simon</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default chats;

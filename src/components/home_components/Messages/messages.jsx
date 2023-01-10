import React from "react";

// importing components
import { Message } from "../..";

// importing css
import "./messages.css";

const messages = () => {
  return (
    <div className="messages">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      {/* <Message />
      <Message /> */}
    </div>
  );
};

export default messages;

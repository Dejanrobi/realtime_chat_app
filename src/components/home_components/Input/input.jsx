import React from "react";
import { attach, img } from "../../../constants/images";

// importing css
import "./input.css";

const input = () => {
  return (
    <div className="input">
      <input type="text" name="" id="" placeholder="Type something..." />
      <div className="send">
        <img src={attach} alt="" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img src={img} alt="" />
        </label>

        <button>Send</button>
      </div>
    </div>
  );
};

export default input;

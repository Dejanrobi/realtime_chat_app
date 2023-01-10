import React from "react";

// importing css
import "./search.css";

const search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" name="" id="" placeholder="Find a user" />
      </div>

      <div className="userChat">
        <img
          src="https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <div className="userChatInfo">
          <span>Jane</span>
        </div>
      </div>
    </div>
  );
};

export default search;

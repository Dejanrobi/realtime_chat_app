import React from "react";

// importing css
import "./navbar.css";
const navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Lama Chat</span>
      <div className="user">
        <img
          src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <span>John</span>
        <button>Log out</button>
      </div>
    </div>
  );
};

export default navbar;

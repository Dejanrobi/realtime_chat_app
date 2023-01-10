import React from "react";
import { Chats, Navbar, Search } from "../..";

// importing css
import "./sidebar.css";

const sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default sidebar;

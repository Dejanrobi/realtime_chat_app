import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";

// importing css
import "./navbar.css";
const Navbar = () => {
  // Navigate hook onLogout
  const navigate = useNavigate();

  const handleLogout = () => {
    // calling the firebase signOut function
    signOut(auth);

    // Navigating to the Login Page when the user Logs Out
    navigate("/login");
  };
  return (
    <div className="navbar">
      <span className="logo">Lama Chat</span>
      <div className="user">
        <img
          src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <span>John</span>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default Navbar;

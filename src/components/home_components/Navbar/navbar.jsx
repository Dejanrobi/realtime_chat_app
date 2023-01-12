import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { auth } from "../../../firebase";

// importing css
import "./navbar.css";
const Navbar = () => {

  // currentUser useContext
  const currentUser  = useContext(AuthContext);
  console.log(currentUser.displayName)
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
          src={currentUser.photoURL}
          alt={currentUser.displayName}
        />
        <span>{currentUser.displayName}</span>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default Navbar;

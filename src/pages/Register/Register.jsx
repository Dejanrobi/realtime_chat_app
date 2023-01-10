import React from "react";
import { addAvatar } from "../../constants/images";

// import "./register.css";

const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        <form>
          <input type="text" placeholder="Enter Name" name="" id="" />
          <input type="email" placeholder="Enter Email" name="" id="" />
          <input type="password" placeholder="Enter Password" name="" id="" />
          <input
            style={{ display: "none" }}
            type="file"
            name=""
            id="file-input"
          />
          <label htmlFor="file-input">
            <img src={addAvatar} alt="" />
            <span>Add an avatar</span>
          </label>
          <button type="submit">Sign up</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;

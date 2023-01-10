import React from "react";
import { addAvatar } from "../../constants/images";

// import "./register.css";

const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Log in</span>
        <form>
          <input type="email" placeholder="Enter Email" name="" id="" />
          <input type="password" placeholder="Enter Password" name="" id="" />

          <button type="submit">Sign in</button>
        </form>
        <p>You don't have an account? Register</p>
      </div>
    </div>
  );
};

export default Login;

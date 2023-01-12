import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addAvatar } from "../../constants/images";

// Importing signing in User with Email and Password
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

// import "./register.css";

const Login = () => {
  const [err, setErr] = useState(false);

  // Navigate Hooks
  const navigate = useNavigate();

  // onSubmit function
  const handleSubmit = async (e) => {
    // Preventing default onSubmit
    e.preventDefault();

    // Obtaining the values on the form    
    const email = e.target[0].value;
    const password = e.target[1].value;
  
    try {
      // Signing in the user with email and password
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
      
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Log in</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter Email" name="" id="" />
          <input type="password" placeholder="Enter Password" name="" id="" />

          <button type="submit">Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;

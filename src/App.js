// import logo from './logo.svg';
// import './App.css';
import "./style.css";

import { Home, Login, Register } from "./pages";
import { BrowserRouter, Navigate, NavLink, Outlet, Route, Router, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { useContext, useEffect, useState } from "react";
import { async } from "@firebase/util";

function App() {
  // const [isLoading, setIsLoading] = (false);
  // const [userIn, setUserIn] = useState(false)
  
  
  const currentUser = useContext(AuthContext)
  

  // const navigate = useNavigate();
  // Protected Router
  const ProtectedRoute=({children})=>{
    if(currentUser){
      return <Home/>
    }
    return children
  }

  

  
  return (
    
      <Routes>
        <Route path="/*" element={<ProtectedRoute><Login/></ProtectedRoute>}/>
        <Route path="/login" element={currentUser?<Navigate to="/home"/>:<Login/>}/>
        <Route path="/home" element={currentUser?<Home/>: <Navigate to="/login"/>}/>
        <Route path="/register" element={currentUser?<Navigate to="/home"/>:<Register/>}/>
      </Routes>
      
  );
}

export default App;

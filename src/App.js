// import logo from './logo.svg';
// import './App.css';
import "./style.css";

import { Home, Login, Register } from "./pages";
import { BrowserRouter, Navigate, Outlet, Route, Router, Routes } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import { async } from "@firebase/util";

function App() {
  const currentUser = useContext(AuthContext);

  // const ProtectedRoute = ({children}) =>{
  //   if(!currentUser){
  //     return <Navigate to="/"/>
  //   }
  //   return children
    
  // }

  // const ProtectedRoutes = ({auth}) => {    
  //     return (auth ? <Outlet/> : <Navigate to="/" replace/>)
  // }

  
 
  return (
    // <div className="App">
    //   {/* <Routes>
        
    //     <Route path="/*" element={<Home/>}/>
    //     <Route path="login" element={<Login/>}/>
    //     <Route path="home" element={<Home/>}/>
    //     <Route path="register" element={<Register/>}/>
        
    //   </Routes> */}
    // </div>

      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="home" element={<Home/>}/>
          <Route path="register" element={<Register/>}/>

          

          
        </Routes>
      </BrowserRouter>
      
    
      
    
  );
}

export default App;

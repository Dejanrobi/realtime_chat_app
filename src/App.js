// import logo from './logo.svg';
// import './App.css';
import "./style.css";

import { Home, Login, Register } from "./pages";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";

function App() {
  const userLoggedIn = useContext(AuthContext);
  const checkUser = () => {
    if (userLoggedIn !== null) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={userLoggedIn ? <Home /> : <Login />} />
        <Route path="/home" element={userLoggedIn ? <Home /> : <Login />} />
        <Route path="/login" element={userLoggedIn ? <Home /> : <Login />} />
        <Route
          path="/register"
          element={userLoggedIn ? <Home /> : <Register />}
        />
      </Routes>
    </div>
  );
}

export default App;

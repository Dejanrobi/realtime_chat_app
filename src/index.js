import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { ChatContextProvider } from "./context/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Wrapping the entire app with the AuthContext Provider
  <Router>
    <React.StrictMode>
      <AuthContextProvider>
        <ChatContextProvider>
          <App />
        </ChatContextProvider>      
      </AuthContextProvider>
    </React.StrictMode>
  </Router>
    

);

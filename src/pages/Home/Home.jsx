import React from "react";
import { Chat, Sidebar } from "../../components";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;

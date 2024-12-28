import React from "react";
import { Link } from "react-router-dom";
import "../Styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to Our App</h1>
      <p className="homepage-text">Please log in or register to continue.</p>
      <div className="homepage-buttons">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../Styles/Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext); // Get user and logout from context
  const navigate = useNavigate();
  console.log(user);

  const handleLogout = () => {
    logout(); // Call context logout
    navigate("/login"); // Redirect to login page
  };

  const handleGeneratePortfolio = () => {
    navigate("/auth/portfolio-form");
  };

  const handleShowPortfolio = () => {
    navigate(`/auth/portfolio/${user._id}`);
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.username || "User"}</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleGeneratePortfolio}>Generate Portfolio</button>
      <button onClick={handleShowPortfolio}>Show My Portfolio</button>
    </div>
  );
};

export default Dashboard;


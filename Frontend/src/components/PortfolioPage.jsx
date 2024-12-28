import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { fetchPortfolioByUserId } from "../services/portfolioService";
import AuthContext from "../context/AuthContext";
import "../Styles/PortfolioPage.css";

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState(null);
  const { user } = useContext(AuthContext);
  const userId = user?._id;

  useEffect(() => {
    const getPortfolio = async () => {
      if (!userId) return;
      try {
        const data = await fetchPortfolioByUserId(userId);
        setPortfolio(data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        alert("Failed to load portfolio.");
      }
    };

    getPortfolio();
  }, [userId]);

  const handleShareLink = () => {
    const link = `${window.location.origin}/auth/portfolio/${userId}`;
    navigator.clipboard.writeText(link);
    alert(`Shareable link copied to clipboard: ${link}`);
  };

  if (!portfolio) return <p className="loading">Loading...</p>;

  return (
    <div className="portfolio-container">
      <h1>{portfolio.name}'s Portfolio</h1>
      <p><strong>Profession:</strong> {portfolio.profession}</p>
      <p><strong>About:</strong> {portfolio.about}</p>
      <p><strong>Skills:</strong> {portfolio.skills}</p>
      <p><strong>Projects:</strong> {portfolio.projects}</p>
      <button onClick={handleShareLink}>Generate Shareable Link</button>
    </div>
  );
};

export default PortfolioPage;

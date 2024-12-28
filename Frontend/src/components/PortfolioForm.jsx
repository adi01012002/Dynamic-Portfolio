import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortfolio } from "../services/portfolioService";
import "../Styles/PortfolioForm.css";

const PortfolioForm = () => {
  const [portfolioData, setPortfolioData] = useState({
    name: "",
    profession: "",
    about: "",
    skills: "",
    projects: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPortfolioData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const portfolio = await createPortfolio(portfolioData);
      const id = portfolio?.portfolio?.userId;
      if (portfolio && id) {
        navigate(`/auth/dashboard/${id}`);
      } else {
        alert("Portfolio creation failed!");
      }
    } catch (error) {
      alert("An error occurred while creating the portfolio.");
      console.error(error);
    }
  };

  return (
    <div className="portfolio-form-container">
      <form className="portfolio-form" onSubmit={handleSubmit}>
        <h2>Create Portfolio</h2>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={portfolioData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="profession"
            placeholder="Profession"
            value={portfolioData.profession}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="about"
            placeholder="About"
            value={portfolioData.about}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="skills"
            placeholder="Skills"
            value={portfolioData.skills}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="projects"
            placeholder="Projects"
            value={portfolioData.projects}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-button" type="submit">
          Create Portfolio
        </button>
      </form>
    </div>
  );
};

export default PortfolioForm;

const Portfolio = require("../models/Portfolio");
exports.createPortfolio = async (req, res) => {
  try {
    const { name, profession, about, skills, projects  } = req.body;
    const userId = req.user.id;
    // console.log(req.user)
    const portfolio = new Portfolio({
      name,
      profession,
      about,
      skills,
      projects,
      userId,
    });
    await portfolio.save();
    res.status(201).json({ portfolio });
  } catch (error) {
    res.status(500).json({ error: "Error creating portfolio" ,error});
  }
};
exports.getPortfolioByUserId = async (req, res) => {
  try {
    // const { token } = req.params;
    // const portfolio = await Portfolio.findOne({ publicToken: token });
    const userId = req.user.id; 
    // console.log("this is",req.user)
    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) return res.status(404).json({ error: "Portfolio not found" });
    res.json({ portfolio });
  } catch (error) {
    res.status(500).json({ error: "Error fetching portfolio" });
  }
};
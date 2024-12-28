const express = require("express");
const { createPortfolio, getPortfolioByUserId } = require("../controllers/portfolioController");
const authenticate = require("../authenticate");

const router = express.Router();

router.post("/create", authenticate, createPortfolio);
router.get("/:UserId", authenticate,getPortfolioByUserId);

module.exports = router;

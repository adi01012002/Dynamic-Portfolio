const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  profession: String,
  about: String,
  skills: String,
  projects: String,
  publicToken: { type: String, unique: true },
});

portfolioSchema.pre('save', function (next) {
  if (!this.publicToken) {
    this.publicToken = crypto.randomUUID(); // Use any UUID generation method
  }
  next();
});

module.exports = mongoose.model("Portfolio", portfolioSchema);

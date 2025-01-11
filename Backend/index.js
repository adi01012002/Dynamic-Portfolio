const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const corsOptions = {
  origin: [
     "https://dynamic-portfolio-1-qxd7.onrender.com/",
  ],
  optionsSuccessStatus: 200,
  credentials: true,
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.use("/auth", authRoutes);
app.use("/portfolio", portfolioRoutes);
const PORT = process.env.PORT;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));


  // mongoose.connect(
//   "mongodb+srv://aditya10462004:TjfGhR9ZDIo5ASms@cluster0.vbjbq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// );
// const db = mongoose.connection;
// db.on("error", (err) => {
//   console.log(err);
// });
// db.on("open", () => {
//   console.log("connected to the database");
// });
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// {
//   "_id": "676e8b4355649a39f1975d41",
//   "username": "user123",
//   "email": "user123@gmail.com",
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NmU4YjQzNTU2NDlhMzlmMTk3NWQ0MSIsImlhdCI6MTczNTI5Nzg1OSwiZXhwIjoxNzM3ODg5ODU5fQ.6VXqi5ajugde94eFpGqs6yP-_WENftiokM3TIRAivHg"
// }

// // const mongoose = require("mongoose");

// // const userSchema = new mongoose.Schema({
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// // });

// // module.exports = mongoose.model("User", userSchema);



// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema(
//   {
//     username: { type: String, required: true }, // Added a username field
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   },
//   { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
// );

// // Pre-save middleware to hash the password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next(); // Only hash the password if it's new or modified
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Method to compare the input password with the hashed password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash the password if it's new or modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
// Instance method to match passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("Comparing:", enteredPassword, "with", this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};


// Export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;


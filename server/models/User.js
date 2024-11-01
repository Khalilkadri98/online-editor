const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  company: { type: String },
  yearsOfExperience: { type: String, required: true },
  inscriptionDate: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const User = mongoose.model("User", userSchema);
module.exports = User;

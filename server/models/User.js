const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  company: { type: String }, // Optional field
  yearsOfExperience: { type: Number},// Optional field
});

module.exports = mongoose.model('User', UserSchema);

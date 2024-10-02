const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  company: { type: String }, // Optional field
  yearsOfExperience: { type: String,required: true},// Optional field
  inscriptionDate: { type: Date, default: Date.now }, // Include inscriptionDate with a default value of the current date
});

module.exports = mongoose.model('User', UserSchema);

// models/UserTutorialProgress.js
const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema from mongoose

const userTutorialProgressSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tutorial: { type: Schema.Types.ObjectId, ref: 'Tutorial', required: true },
  currentStep: { type: Number, default:1 }
});

const UserTutorialProgress = mongoose.model('UserTutorialProgress', userTutorialProgressSchema);

module.exports = UserTutorialProgress;
